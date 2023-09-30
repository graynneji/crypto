import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const TradeSuccessModal = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate("/earn");
    closeModal();
  };
  const modalStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      width: "50%",
      height: "20%",
      margin: "auto",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Trade Success Modal"
      style={modalStyles}
    >
      <h2>Trade Created Successfully!</h2>
      <p>Your trade has been created successfully.</p>
      <button onClick={handleOkClick}>OK</button>
    </Modal>
  );
};

export default TradeSuccessModal;
