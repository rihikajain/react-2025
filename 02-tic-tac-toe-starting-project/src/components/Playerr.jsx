import { useState } from "react";

export default function Playerr({ name, symbol, isActive }) {
  const [plname, setplname] = useState(name);
  const [isedit, setedit] = useState(false);

  let playernamebtn = isedit === true ? "Save" : "Edit";
  let playerName = <span className="player-name">{plname}</span>;

  if (isedit) {
    playerName = (
      <input type="text" required value={plname} onChange={handleChange} />
    );
  }

  function editbutton() {
    setedit((edit) => !isedit);
  }

  function handleChange(e) {
    setplname(e.target.value);
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerName} </span>
      <span className="player-symbol">{symbol}</span>

      <button onClick={editbutton}>{playernamebtn}</button>
    </li>
  );
}
