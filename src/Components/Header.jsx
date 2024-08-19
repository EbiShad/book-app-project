import { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiPlus } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import useOutSideClick from "../Hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  Link,
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "./Context/AuathProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 2,
    room: 3,
  });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    // setSearchParams(encodedParams)
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div>
      <div className="header">
        <Link to="/bookmark">Bookmarks</Link>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <MdLocationOn className="headerIcon locationIcon" />
            <input
              type="text"
              placeholder="where to go"
              className="headerSearchInput"
              id="destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <span className="seperator"></span>
          </div>

          <div className="headerSearchItem">
            <HiCalendar className="headerIcon dateIcon" />
            <div
              className="dateDropDown"
              onClick={() => setOpenDate(!openDate)}
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </div>
            {openDate && (
              <DateRange
                ranges={date}
                className="date"
                minDate={new Date()}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={true}
              />
            )}
            <span className="seperator"></span>
          </div>

          <div className="headerSearchItem">
            <div
              id="optionDropDown"
              onClick={() => setOpenOptions(!openOptions)}
            >
              {options.adult} adualt &bull; {options.children} chilren &bull;{" "}
              {options.room}room
            </div>
            {openOptions && (
              <div className="guestOptions">
                <GetOptionList
                  options={options}
                  handleOption={handleOption}
                  setOpenOptions={setOpenOptions}
                />
              </div>
            )}
            <span className="seperator"></span>
          </div>

          <div className="headerSearchItem">
            <button className="headerSearchBtn" onClick={handleSearch}>
              <HiSearch className="headerIcon" />
            </button>
          </div>
        </div>
        <User />
      </div>
    </div>
  );
}

export default Header;

function GetOptionList({ options, handleOption, setOpenOptions }) {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  return (
    <div className="guestOption" ref={optionsRef}>
      <OptionItem
        options={options}
        type="adult"
        minLimit={1}
        handleOption={handleOption}
      />
      <OptionItem
        options={options}
        type="children"
        minLimit={0}
        handleOption={handleOption}
      />
      <OptionItem
        options={options}
        type="room"
        minLimit={1}
        handleOption={handleOption}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOption }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText"> {type} </span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handleOption(type, "dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="iconCountNumber"> {options[type]} </span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const { user, isAuathenticated , Logout} = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
      Logout();
      navigate("/")
  }

  return (
    <div>
      {isAuathenticated ? (
        <div>
          <span>{user.name}</span>
          <button onClick={handleLogout} className="btn"> logout </button>
        </div>
      ) : (
        <NavLink to="/login">login</NavLink>
      )}
    </div>
  );
}
