import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import MemberForm from "../forms/MemberForm";
import { addMember, getMember } from "../../services";
import { PLANS } from "../../constants";
import { formatDate } from "../../utils/formatDate";
const MemberInfoCard = ({ setModalOpen, fetchMembers, memberId }) => {
  // state
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountLeft, setAmountLeft] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(PLANS.oneMonth);
  const [startDate, setStartDate] = useState(formatDate(Date.now()));
  const [endDate, setEndDate] = useState(() => {
    const currentMonth = new Date();
    return new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
  });
  const [loadingUpload, setLoadingUpload] = useState(false);

  // end of state

  useEffect(() => {
    const currentMonth = new Date(startDate);
    const monthValue = selectedMembership === PLANS.oneMonth ? 1 : 2;
    const newDate = new Date(
      currentMonth.setMonth(currentMonth.getMonth() + monthValue)
    );
    setEndDate(newDate);
  }, [startDate, selectedMembership]);

  useEffect(() => {
    // auto generate the total amount
    const amount = selectedMembership === PLANS.oneMonth ? 1500 : 2500;
    setTotalAmount(amount);
  }, [selectedMembership]);

  // amount left
  useEffect(() => {
    const amountLeft = Number(totalAmount) - Number(paidAmount);
    setAmountLeft(amountLeft);
  }, [paidAmount, totalAmount]);

  useEffect(() => {
    if (memberId == null || memberId == "") return;
    const main = async () => {
      try {
        const [data] = await getMember(memberId);
        setFullName(data.fullName);
        setPhoneNumber(data.phoneNumber);
        setAge(data.age);
        setPaidAmount(data.paidAmount);
        setPhoto(data.photo);
        setStartDate(data.startDate);
        setSelectedMembership(Number(data.membership?.split(" ")[0]));
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    main();
  }, [memberId]);

  async function getPhotoFile(photo, name) {
    let newPhoto;
    try {
      let blob;
      if (typeof photo === "object") {
        blob = photo?.slice(0, photo?.size, photo?.type);
        newPhoto = new File(
          [blob],
          name + "." + photo.name.substr(photo.name.lastIndexOf(".") + 1),
          { type: photo?.type }
        );
      } else if (typeof photo === "string") {
        blob = await fetch(photo).then((res) => res.blob());
        newPhoto = new File([blob], name + "." + blob.type.split("/")[1], {
          type: blob.type,
        });
      }
    } catch (error) {
      console.log(error);
    }
    return newPhoto;
  }
  async function getFormData(data = null) {
    const formData = new FormData();
    const customId = crypto.randomUUID();
  
    try {
      const newPhoto = await getPhotoFile(photo, data?data.id:customId);
      formData.append("photoUpload", data ? data.newPhoto : newPhoto);
      formData.append("photo", data ? data.newPhoto.name : newPhoto.name);
    } catch (error) {
      console.log(error);
    }

    formData.append("id", data ? data.id : customId);
    formData.append("fullName", data ? data.fullName : fullName);
    formData.append("phoneNumber", data ? data.phoneNumber : phoneNumber);
    formData.append("age", data ? data.age : age);
    formData.append("startDate", data ? data.startDate : startDate);
    formData.append("endDate", data ? data.endDate : endDate);
    formData.append("totalAmount", data ? data.totalAmount : totalAmount);
    formData.append("paidAmount", data ? data.paidAmount : paidAmount);
    formData.append("amountLeft", data ? data.amountLeft : amountLeft);

    formData.append(
      "membership",
      selectedMembership === PLANS.oneMonth ? "1 month" : "2 months"
    );
    return formData;
  }

  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoadingUpload(true);
      if (memberId) {
        console.log("editing member");
        const formData = {}
        await updateMember(memberId,formData)

        // edit state
      } else {
        console.log("adding member");
        await addMember(await getFormData());
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingUpload(false);
    setModalOpen(false);
    fetchMembers();
    onCancel();
  }

  function onCancel() {
    setSelectedMembership(PLANS.oneMonth);
    setFullName("");
    setPhoneNumber("");
    setPaidAmount(0);
    setPhoto(null);
    setModalOpen(false);
    setStartDate(new Date());
    // setEndDate()
  }

  return (
    <Box sx={{ overflowY: "scroll", maxHeight: "80vh" }}>
      <MemberForm
        state={{
          handleSubmit,
          photo,
          setPhoto,
          fullName,
          setFullName,
          phoneNumber,
          setPhoneNumber,
          age,
          setAge,
          paidAmount,
          setPaidAmount,
          totalAmount,
          setTotalAmount,
          amountLeft,
          setAmountLeft,
          showCamera,
          setShowCamera,
          selectedMembership,
          setSelectedMembership,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          loadingUpload,
          setLoadingUpload,
          onCancel,
        }}
      />
    </Box>
  );
};

export default MemberInfoCard;
