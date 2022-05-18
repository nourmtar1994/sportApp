import React, { useEffect, useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import * as classes from "./O_Card.module.css";
import { Card, Divider, Statistic } from "antd";
const O_Card = ({
  color = "secondary",
  title = null,
  subTitle = null,
  body = null,
  icon = null,
  footer,
}) => {
  const [colorStyle, setColorStyle] = useState("");
  const [iconColor, setIconColor] = useState("grey");
  useEffect(() => {
    switch (color) {
      case "primary": {
        setColorStyle(classes.card_primary);
        setIconColor("rgb(26, 115, 232)");
        break;
      }
      case "success": {
        setColorStyle(classes.card_success);
        setIconColor("rgb(67, 160, 71)");
        break;
      }
      case "danger": {
        setColorStyle(classes.card_danger);
        setIconColor("#e53935");
        break;
      }
      case "warning": {
        setColorStyle(classes.card_warning);
        setIconColor("#fb8c00");
        break;
      }
      case "pink": {
        setColorStyle(classes.card_pink);
        setIconColor("#d81b60");
        break;
      }
      default: {
        setColorStyle(classes.card_black);
        setIconColor("black");
        break;
      }
    }
  }, []);
  return (
    <Card className={`${classes.o_card}  ${colorStyle}`}>
      <div className="card_header ">
        <h1>{title}</h1>
        <span className="icon">{icon}</span>
      </div>
      <div className="card_body">{body}</div>
      {footer && (
        <div className="o_card_footer">
          <hr></hr>
          {footer}
        </div>
      )}
    </Card>
  );
};
export default O_Card;
