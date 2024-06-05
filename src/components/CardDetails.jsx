import profilePic from "../assets/profile.png";
import masterCard from '../assets/mastercard.png'
import visa from '../assets/visa.png'
import rupay from '../assets/rupay.png'

const CardDetails = () => {
  return (
    <div className="card__info bg-[rgba(86,90,187,1)] rounded-lg p-6">
      <div className="card__head flex justify-between">
        <div className="card__name">
          <h1 className="font-sans text-white font-bold">Card Details</h1>
          <h3 className="text-white font-semibold">Card type</h3>
        </div>

        <img src={profilePic} alt="" className="profile__pic w-30 h-30 object-cover" />
      </div>
      <div className="visa__types flex justify-around mt-4">
      <img src={masterCard} alt="" className="w-[75px] h-[55px]" />
      <img src={visa} alt="" className="w-[75px] h-[55px]" />
      <img src={rupay} alt="" className="w-[75px] h-[55px]" />
      <p className="text-white bg-[rgba(217, 217, 217, 0.2)] rounded-md px-2 py-1">See all</p>
      </div>
    </div>
  );
};

export default CardDetails;