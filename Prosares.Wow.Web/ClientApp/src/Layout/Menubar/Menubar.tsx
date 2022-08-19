import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContext } from "../../Helpers/Context/Context";
import ProtectedMenu from "../../Helpers/ProtectedMenu";

function Menubar(props) {
  const [isMasterExpanded, setMasterExpanded] = useState("sub-menu");
  const [isCapacityExpanded, setIsCapacityExpanded] = useState("sub-menu");
  const [env, setEnv] = useState<any>(
    process.env.REACT_APP_PUBLISH_PATH ? process.env.REACT_APP_PUBLISH_PATH : ""
  );

  useEffect(() => {
    if (props.menuOpen) {
      toggleFunc();
    } else {
      revToggleFunc();
    }
  }, [props.menuOpen]);

  const toggleFunc = () => {
    const body = document.querySelector("body");
    body.classList.add("menubar-visible");
  };

  const revToggleFunc = () => {
    const body = document.querySelector("body");
    body.classList.remove("menubar-visible");
    setMasterExpanded("sub-menu");
    setIsCapacityExpanded("sub-menu");
  };

  const handleMenuSubmenu = (menu: any) => {
    if (menu === "Admin") {
      if (isMasterExpanded === "sub-menu") {
        setMasterExpanded("sub-menu expanded");
      } else {
        setMasterExpanded("sub-menu");
      }
    } else {
      if (isCapacityExpanded === "sub-menu") {
        setIsCapacityExpanded("sub-menu expanded");
      } else {
        setIsCapacityExpanded("sub-menu");
      }
    }
    // handleCustomMenuClick("Admin");
  };

  const { RoleId } = getContext();
  const RoleIdArray = RoleId.split(",");

  return (
    <div
      id="menubar"
      className="menubar-inverse "
      onMouseEnter={toggleFunc}
      onMouseLeave={revToggleFunc}>
      <div className="menubar-scroll-panel">
        <ul id="main-menu" className="gui-controls">
          <ProtectedMenu permittedPages={"Dashboard"}>
            <li>
              <Link to={`${env}/Dashboard`} onClick={() => revToggleFunc()}>
                <div className="gui-icon">
                  <i className="fas fa-home" style={{ color: "#96c61c" }}></i>
                  <span>Dashboard</span>
                </div>
                <span className="title">Dashboard</span>
              </Link>
            </li>
          </ProtectedMenu>

          {/* <ProtectedMenu permittedPages={"CalendarUI"}>
            <li>
              <Link to={`${env}/calendar`} onClick={() => revToggleFunc()}>
                <div className="gui-icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <span className="title">Calendar</span>
              </Link>
            </li>
          </ProtectedMenu> */}

          {RoleIdArray.includes("6") && (
            <li
              className={isMasterExpanded}
              onClick={() => handleMenuSubmenu("Admin")}>
              <a role="button">
                <div className="gui-icon">
                  <i
                    className="fas fa-tools"
                  // style={{
                  //   color: adminSelected ? "#ffff00" : "#ffffff",
                  // }}
                  ></i>
                </div>
                <span
                  className="title"
                // style={{
                //   color: adminSelected ? "#ffff00" : "#ffffff",
                // }}
                >
                  Master
                </span>{" "}
              </a>
              <ul>
                <ProtectedMenu permittedPages={"CustomerMaster"}>
                  <li>
                    <Link
                      to={`${env}/master/customer`}
                      onClick={() => revToggleFunc()}>
                      <span className="title">Customer Master</span>
                    </Link>
                  </li>
                </ProtectedMenu>

                <ProtectedMenu permittedPages={"MilestoneMaster"}>
                  <li>
                    <Link
                      to={`${env}/master/milestone`}
                      onClick={() => revToggleFunc()}>
                      <span className="title">Milestone Master</span>
                    </Link>
                  </li>
                </ProtectedMenu>

                <ProtectedMenu permittedPages={"EmployeeMaster"}>
                  <li>
                    <Link
                      to={`${env}/master/employee`}
                      onClick={() => revToggleFunc()}>
                      <span className="title">Employee Master</span>
                    </Link>
                  </li>
                </ProtectedMenu>

                <ProtectedMenu permittedPages={"EngagementMaster"}>
                  <li>
                    <Link
                      to={`${env}/master/engagement`}
                      onClick={() => revToggleFunc()}>
                      <span className="title">Engagement Master</span>
                    </Link>
                  </li>
                </ProtectedMenu>

                <ProtectedMenu permittedPages={"ApplicationMaster"}>
                  <li>
                    <Link
                      to={`${env}/master/application`}
                      onClick={() => revToggleFunc()}>
                      <span className="title">Application Master</span>
                    </Link>
                  </li>
                </ProtectedMenu>
                <ProtectedMenu permittedPages={"PhaseMaster"}>
                  <li>
                    <Link
                      to={`${env}/master/phase`}
                      onClick={() => revToggleFunc()}>
                      <span className="title">Phase Master</span>
                    </Link>
                  </li>
                </ProtectedMenu>
                <ProtectedMenu permittedPages={"CostCenterMaster"}>
                  <li>
                    <Link
                      to={`${env}/master/costcenter`}
                      onClick={() => revToggleFunc()}>
                      <span className="title">Cost Center Master</span>
                    </Link>
                  </li>
                </ProtectedMenu>
                <ProtectedMenu permittedPages={"WorkPolicyMaster"}>
                  <li>
                    <Link
                      to={`${env}/master/workpolicy`}
                      onClick={() => revToggleFunc()}>
                      <span className="title">Work Policy Master</span>
                    </Link>
                  </li>
                </ProtectedMenu>
              </ul>
            </li>
          )}
          {(RoleIdArray.includes("3") ||
            RoleIdArray.includes("4") ||
            RoleIdArray.includes("6")) && (
              <ProtectedMenu permittedPages={"LeaveMaster"}>
                <li>
                  <Link
                    to={`${env}/master/leaveRequest`}
                    onClick={() => revToggleFunc()}>
                    <div className="gui-icon">
                      <i className="fas fa-calendar-minus"></i>
                    </div>
                    <span className="title">Leave Report</span>
                  </Link>
                </li>
              </ProtectedMenu>
            )}
          <ProtectedMenu permittedPages={"TaskAssignment"}>
            <li>
              <Link
                to={`${env}/TaskDashboard`}
                onClick={() => revToggleFunc()}
                state={"true"}>
                <div className="gui-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <span className="title">Task</span>
              </Link>
            </li>
          </ProtectedMenu>

          <ProtectedMenu permittedPages={"TicketAssignment"}>
            <li>
              <Link
                to={`${env}/TicketDashboard`}
                onClick={() => revToggleFunc()}
                state={"false"}>
                <div className="gui-icon">
                  <i className="fas fa-ticket"></i>
                </div>
                <span className="title">Ticket</span>
              </Link>
            </li>
          </ProtectedMenu>
          {(RoleIdArray.includes("2") ||
            RoleIdArray.includes("3") ||
            RoleIdArray.includes("6")) && (
              <>
                {/* <ProtectedMenu permittedPages={"TicketAssignment"}>
                <li>
                  <Link
                    to={`${env}/TicketAssignment`}
                    onClick={() => revToggleFunc()}>
                    <div className="gui-icon">
                      <i className="fas fa-ticket"></i>
                    </div>
                    <span className="title">Ticket Assignment</span>
                  </Link>
                </li>
              </ProtectedMenu>
              <ProtectedMenu permittedPages={"TaskAssignment"}>
                <li>
                  <Link
                    to={`${env}/TaskAssignment`}
                    onClick={() => revToggleFunc()}>
                    <div className="gui-icon">
                      <i className="fas fa-tasks"></i>
                    </div>
                    <span className="title">Task Assignment</span>
                  </Link>
                </li>
              </ProtectedMenu> */}
                {RoleIdArray.includes("3") && (
                  <li className={isCapacityExpanded} onClick={handleMenuSubmenu}>
                    <a role="button">
                      <div className="gui-icon">
                        <i className="fas fa-users-gear"></i>
                      </div>
                      <span className="title">Capacity Allocation</span>{" "}
                    </a>
                    <ul>
                      <ProtectedMenu permittedPages={"CapacityAllocation"}>
                        <li>
                          <Link
                            to={`${env}/CapacityAllocation/AMC`}
                            onClick={() => revToggleFunc()}>
                            <span className="title">
                              Capacity Allocation - AMC
                            </span>
                          </Link>
                        </li>
                      </ProtectedMenu>
                      <ProtectedMenu permittedPages={"CapacityAllocation"}>
                        <li>
                          <Link
                            to={`${env}/CapacityAllocation/TNM`}
                            onClick={() => revToggleFunc()}>
                            <span className="title">
                              Capacity Allocation - T&amp;M
                            </span>
                          </Link>
                        </li>
                      </ProtectedMenu>
                      <ProtectedMenu permittedPages={"CapacityAllocation"}>
                        <li>
                          <Link
                            to={`${env}/CapacityAllocation/PROJECT`}
                            onClick={() => revToggleFunc()}>
                            <span className="title">
                              Capacity Allocation - Project
                            </span>
                          </Link>
                        </li>
                      </ProtectedMenu>
                    </ul>
                  </li>
                )}
              </>
            )}
        </ul>
      </div>
    </div>
  );
}

export default Menubar;
