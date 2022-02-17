import DaumPostcode from "react-daum-postcode";

interface Props {
  postCode: (data: any) => void;
}

const Postcode = ({ postCode }: Props) => {
  const handleComplete = (data: any) => {
    postCode(data);

    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };
  return <DaumPostcode onComplete={handleComplete} />;
};

export default Postcode;
