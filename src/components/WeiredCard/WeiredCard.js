import React, { useEffect, useState } from "react";
import { useAxios } from "../Services/Axios";
//ICONS
import {
  DribbbleOutlined,
  LeftOutlined,
  PartitionOutlined,
  RightOutlined,
  SafetyOutlined,
  TeamOutlined,
  ToolOutlined,
} from "@ant-design/icons";
//CSS FILES
import "./WeiredCard.css";
import image from "../../assets/images/arme.png";
import { Image } from "antd";

const WeiredCard = ({ data, getPersonnelByUnite, selected, foundData }) => {
  const [scroll, setScroll] = useState(0);

  const cardBorder = foundData
    ? { borderBottom: "5px solid #306ca7" }
    : { borderBottom: "5px solid red" };

  console.log(data);

  const changeScroll = (incrimentValue, value = 500) => {
    const bullsScrollPos = document.getElementById("bulles").scrollLeft;
    setScroll(bullsScrollPos);
    if (
      (scroll <= 0 && scroll >= bullsScrollPos) ||
      (bullsScrollPos < 0 && bullsScrollPos < scroll)
    ) {
      if (incrimentValue === "right") {
        setScroll(scroll - value);
      } else {
        setScroll(scroll + value);
      }
    }
    scroll > 0 && setScroll(0);
  };
  useEffect(() => {
    document.getElementById("bulles").scrollLeft = scroll;
    console.log(selected);
  }, [scroll]);

  return (
    <div className="container">
      <div className="card">
        <div className="icon">
          <Image preview={false} src={image} width={80} height={80} />
        </div>
        <span onClick={() => changeScroll("right")} className={"nextIcon"}>
          <LeftOutlined />
        </span>
        <div className="bulles" id="bulles">
          {/* {data[0].unities?.map((item) => (
            <div
              style={item === selected ? cardBorder : {}}
              key={item._id}
              className="bull"
              onClick={() => getPersonnelByUnite(item)}
            >
              <PartitionOutlined className="bullIcon" />
              <span className="bullText">{item.label_AR}</span>
            </div>
          ))} */}

          {/* <div className="bull">
            <SafetyOutlined className="bullIcon" />
            <span className="bullText">مجمع الحماية</span>
          </div>
          <div className="bull">
            <DribbbleOutlined className="bullIcon priamry" />
            <span className="bullText">مصلحة الرياضة</span>
          </div>
          <div className="bull">
            <ToolOutlined className="bullIcon priamry" />
            <span className="bullText">مجمع البنية التحتية</span>
          </div>
          <div className="bull">
            <TeamOutlined className="bullIcon" />
            <span className="bullText">مكتب الأفراد</span>
          </div> */}
        </div>
        <span className={"previewIcon"} onClick={() => changeScroll("left")}>
          <RightOutlined />
        </span>
      </div>
    </div>
  );
};

export default WeiredCard;
