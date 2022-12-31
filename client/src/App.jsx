import "./styles.css";
import MemberModal from "./components/models/MemberModal";
import DeleteMemberModel from "./components/models/DeleteMemberModel";
import React, { useMemo } from "react";
import AllMembersList from "./components/AllMembersList";
import Navbar from "./components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { getAllMembers } from "./services";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { TIME_BEFORE_SEND_NOTIFICATION_OPTIONS } from "./constants"

// notification

function App() {
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [deleteMemberModalOpen, setDeleteMemberModalOpen] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [themeMode, setThemeMode] = useState("dark");
  const [allMembers, setAllMembers] = useState([]);
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [timeBeforeSendNotification, setTimeBeforeSendNotification] = useState(TIME_BEFORE_SEND_NOTIFICATION_OPTIONS[3]);


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  useEffect(() => {
    async function main() {
      await fetchMembers();
    }
    main();
  }, []);

  const fetchMembers = useCallback(async () => {
    try {
      setAllMembers(await getAllMembers());
    } catch (error) {
      console.log(error);
    }
  }, []);


// notifications for expired members
  useEffect(() => {
    let timeOut;

    allMembers?.forEach((member) => {
      const endDate = new Date(member.endDate);
      const nowDate = new Date();
      const oneDayInMiliseconds =86400000
      const dif = endDate - nowDate - (timeBeforeSendNotification.valueInDays*oneDayInMiliseconds);
      //  every time we refresh the page the nowDate came closer to the end date thus making the difrence smaller "meeeeen im a genius"
      //  if dif is greater then 24.8 days it will not do nothing
      if (dif > 2147483647) {
        return;
      } else {
        // if the member is ion the past notification will be resubmitted.
        timeOut = setTimeout(() => {
          // added somthing like an alert ??.
          const memberExists = expiredMembers?.find((m) => m.id === member.id);
          if (memberExists) return;
          setExpiredMembers((prev) => [...prev, member]);
        }, dif);
      }

    });

    return () => clearTimeout(timeOut);
  }, [allMembers, timeBeforeSendNotification]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        setMemberModalOpen={setMemberModalOpen}
        setThemeMode={setThemeMode}
        setMemberId={setMemberId}
        expiredMembers={expiredMembers}
        setExpiredMembers={setExpiredMembers}
        timeBeforeSendNotification={timeBeforeSendNotification}
        setTimeBeforeSendNotification={setTimeBeforeSendNotification}
      />

      <AllMembersList
        setMemberModalOpen={setMemberModalOpen}
        setDeleteMemberModalOpen={setDeleteMemberModalOpen}
        setMemberId={setMemberId}
        members={allMembers}
      />

      <MemberModal
        open={memberModalOpen}
        setOpen={setMemberModalOpen}
        memberId={memberId}
        setMemberId={setMemberId}
        fetchMembers={fetchMembers}
      />

      <DeleteMemberModel
        open={deleteMemberModalOpen}
        setOpen={setDeleteMemberModalOpen}
        memberId={memberId}
        setMemberId={setMemberId}
        fetchMembers={fetchMembers}
      />
    </ThemeProvider>
  );
}

export default App;
