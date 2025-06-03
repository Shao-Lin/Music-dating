import { useNavigate } from "react-router";
import arrowBack from "../../assets/chat/ArrowBack.svg";
import infinity from "../../assets/premium/infinity.png";
import regenerate from "../../assets/premium/regenerate.png";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import { ClassicButton } from "../UI/buttons/classicButton/ClassicButton";
import { CustomModal } from "../modals/questionModal/CustomModal";
import { SuccessModal } from "../modals/successModal/SuccessModal";
import { useBuySubMutation } from "../../api/settingsAndEditProfileApi";

const PinkRadio = styled(Radio)({
  "&.Mui-checked": {
    color: "#FE6D87",
  },
});

export const BuyPremium = () => {
  const navigate = useNavigate();
  const [buyPremium] = useBuySubMutation();
  const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">(
    "yearly"
  );

  const handleBuy = async () => {
    setIsModalQuestionOpen(false);
    try {
      await buyPremium(undefined).unwrap();
    } catch (error) {
      console.error(error);
    }
    setSuccessIsModalOpen(true);
  };

  return (
    <>
      <div className="premium">
        <button className="premium__back-button" onClick={() => navigate(-1)}>
          <img src={arrowBack} alt="Назад" />
        </button>

        <header className="wrap-header">
          <div className="premium__title">Vibe</div>
          <div className="premium__title">Premium</div>
        </header>

        <div className="premium__option">
          <img
            src={infinity}
            alt="Количество свайпов"
            className="premium__option__icon"
          />
          <span className="premium__option__label">
            Безлимитное количество свайпов
          </span>
        </div>

        <div className="premium__option">
          <img
            src={regenerate}
            alt="Генерация трека"
            className="premium__option__icon"
          />
          <span className="premium__option__label">
            Безлимитная генерация треков
          </span>
        </div>

        <div className="premium__plans">
          <label className="premium__plan">
            <PinkRadio
              checked={selectedPlan === "yearly"}
              onChange={() => setSelectedPlan("yearly")}
              value="yearly"
              name="plan"
            />
            <div className="premium__plan__content">
              <div className="top-row">
                <span className="plan-name">Ежегодно</span>
                <span className="plan-discount">-25%</span>
                <span className="plan-monthly">225р в месяц</span>
              </div>
              <div className="bottom-row">
                <span className="plan-yearly">2 700р в год</span>
              </div>
            </div>
          </label>

          <label className="premium__plan">
            <PinkRadio
              checked={selectedPlan === "monthly"}
              onChange={() => setSelectedPlan("monthly")}
              value="monthly"
              name="plan"
            />
            <div className="premium__plan__content">
              <div className="top-row center">
                <span className="plan-name">Ежемесячно</span>
                <span className="plan-monthly">299р в месяц</span>
              </div>
            </div>
          </label>
        </div>

        <div className="premium__bottom-button">
          <ClassicButton
            name={
              selectedPlan === "yearly"
                ? "Купить подписку за 2 700р в год"
                : "Купить подписку за 299р в месяц"
            }
            type="button"
            onClick={() => setIsModalQuestionOpen(true)}
          />
        </div>
      </div>

      {isModalQuestionOpen && (
        <CustomModal
          onClose={() => setIsModalQuestionOpen(false)}
          onDelete={handleBuy}
          description="Приобрести Vibe Premium?"
          back="Назад"
          action="Да"
        />
      )}

      {isSuccessModalOpen && (
        <SuccessModal onClose={() => setSuccessIsModalOpen(false)} />
      )}
    </>
  );
};
