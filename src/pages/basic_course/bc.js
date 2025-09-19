import { memo } from "react";
import "./bc.css";

const BC = () => {
  return (
    <div className="bc">
      <div>VI, VII, VIII, IX & X (Science & Maths)</div>
      <div>XI & XII (Physics, Mathematics, Chemistry & Biology)</div>
    </div>
  );
};

export default memo(BC);
