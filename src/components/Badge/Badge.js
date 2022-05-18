import React, { useState } from "react";
import { LineChartOutlined } from "@ant-design/icons";
import * as classes from "./badge.module.css";
import { Card } from "antd";

const Badge = (props) => {
  let {
    color,
    size = 80,
    icon = false,
    title = false,
    hoverable = false,
    align,
    action,
  } = props;

  /*
   *********color set*********
   */

  const badgeColor =
    color === "danger"
      ? classes.customDangerBadge
      : color === "success"
      ? classes.customSuccessBadge
      : color === "primary"
      ? classes.customPrimaryBadge
      : classes.customWarningBadge;
  /*
   *********color position*********
   */

  const [postion, setPostion] = useState(
    align === "right"
      ? {
          top: "-20px",
          right: "20px",
        }
      : {
          top: "-20px",
          left: "20px",
        }
  );
  /*
   *********color set*********
   */
  const badgeSize = {
    width: size,
    height: size,
    fontSize: size / 2 - 5 + "px",
    ...postion,
  };

  /*
   *********color set*********
   */
  const MouseEnterEffect = () => {
    hoverable &&
      setPostion({
        ...postion,
        top: "-50px",
      });
  };

  const MouseLeaveEffect = () => {
    hoverable &&
      setPostion({
        ...postion,
        top: "-20px",
      });
  };

  return (
    <Card
      bordered={false}
      title={
        title && (
          <div>
            <b
              style={
                align === "right"
                  ? { marginRight: "90px", color: "grey" }
                  : { marginRight: 0, color: "grey" }
              }
            >
              {title}
            </b>
            {action?.map((item, key) => (
              <b key={key} style={{ float: "left" }}>
                {item}
              </b>
            ))}
          </div>
        )
      }
      hoverable
      style={{ width: "100%" }}
      onMouseEnter={() => MouseEnterEffect()}
      onMouseLeave={() => MouseLeaveEffect()}
    >
      <div
        className={`${classes.customBadge} ${badgeColor}`}
        style={{ ...badgeSize }}
      >
        {icon ? icon : <LineChartOutlined />}
      </div>
      {props.children}
    </Card>
  );
};
export default Badge;
