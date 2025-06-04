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
import { useTranslation } from "react-i18next";

const PinkRadio = styled(Radio)({
  "&.Mui-checked": {
    color: "#FE6D87",
  },
});

export const BuyPremium = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        <button
          className="premium__back-button"
          onClick={() => navigate(-1)}
          aria-label={t("buyPremiumPage.back")}
        >
          <img src={arrowBack} alt={t("buyPremiumPage.back")} />
        </button>

        <header className="wrap-header">
          <div className="premium__title">{t("buyPremiumPage.titleLine1")}</div>
          <div className="premium__title">{t("buyPremiumPage.titleLine2")}</div>
        </header>

        <div className="premium__option">
          <img
            src={infinity}
            alt={t("buyPremiumPage.swipesUnlimited")}
            className="premium__option__icon"
          />
          <span className="premium__option__label">
            {t("buyPremiumPage.swipesUnlimited")}
          </span>
        </div>

        <div className="premium__option">
          <img
            src={regenerate}
            alt={t("buyPremiumPage.tracksUnlimited")}
            className="premium__option__icon"
          />
          <span className="premium__option__label">
            {t("buyPremiumPage.tracksUnlimited")}
          </span>
        </div>

        <div className="premium__plans">
          <label className="premium__plan">
            <PinkRadio
              checked={selectedPlan === "yearly"}
              onChange={() => setSelectedPlan("yearly")}
              value="yearly"
              name="plan"
              inputProps={{ "aria-label": t("buyPremiumPage.yearlyPlan") }}
            />
            <div className="premium__plan__content">
              <div className="top-row">
                <span className="plan-name">
                  {t("buyPremiumPage.yearlyPlan")}
                </span>
                <span className="plan-discount">
                  {t("buyPremiumPage.discount")}
                </span>
                <span className="plan-monthly">
                  {t("buyPremiumPage.monthlyPriceYearlyPlan")}
                </span>
              </div>
              <div className="bottom-row">
                <span className="plan-yearly">
                  {t("buyPremiumPage.yearlyPrice")}
                </span>
              </div>
            </div>
          </label>

          <label className="premium__plan">
            <PinkRadio
              checked={selectedPlan === "monthly"}
              onChange={() => setSelectedPlan("monthly")}
              value="monthly"
              name="plan"
              inputProps={{ "aria-label": t("buyPremiumPage.monthlyPlan") }}
            />
            <div className="premium__plan__content">
              <div className="top-row center">
                <span className="plan-name">
                  {t("buyPremiumPage.monthlyPlan")}
                </span>
                <span className="plan-monthly">
                  {t("buyPremiumPage.monthlyPrice")}
                </span>
              </div>
            </div>
          </label>
        </div>

        <div className="premium__bottom-button">
          <ClassicButton
            name={
              selectedPlan === "yearly"
                ? t("buyPremiumPage.buyYearly")
                : t("buyPremiumPage.buyMonthly")
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
          description={t("buyPremiumPage.confirmModalText")}
          back={t("buyPremiumPage.cancel")}
          action={t("buyPremiumPage.confirm")}
        />
      )}

      {isSuccessModalOpen && (
        <SuccessModal onClose={() => setSuccessIsModalOpen(false)} />
      )}
    </>
  );
};
