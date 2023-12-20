import React from "react";
import Navbar from "../../component/navbar/Navbar";
import style from "./Home.module.css";
import BasicTable from "../../component/table/Table";
import PieChartCumTable from "../../component/pieChartCumTable/PieChartCumTable";

function HomePage() {
  return (
    <div className={style.container}>
      <Navbar />

      <div className={style.content_Container}>
        <div className={style.left}>
          <BasicTable />
        </div>
        <div className={style.right}>
          <PieChartCumTable />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
