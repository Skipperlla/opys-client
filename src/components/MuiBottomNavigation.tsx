import { Backpack, Group, Home } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const MuiBottomNavigation = () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      sx={{
        boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.30)",
        width: "100%",
        zIndex: "9999",
        bottom: 0,
        position: "fixed",
        display: {
          xs: "flex",
          sm: "none",
        },
      }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <Link href={"/"}>
        <BottomNavigationAction label="Anasayfa" showLabel icon={<Home />} />
      </Link>
      <Link href={"/groups"}>
        <BottomNavigationAction showLabel label="Gruplar" icon={<Group />} />
      </Link>
      <Link href={"/tasks"}>
        <BottomNavigationAction
          showLabel
          label="Görevler"
          icon={<Backpack />}
        />
      </Link>
    </BottomNavigation>
  );
};

export default MuiBottomNavigation;
