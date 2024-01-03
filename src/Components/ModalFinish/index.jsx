import { useContext } from "react";
import { ModalFinishContext } from "../../Context";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaX } from "react-icons/fa6";
import "./index.css";
const ModalFinish = () => {
  const context = useContext(ModalFinishContext);

  return (
    <>
      <Modal
        open={context.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <FaX className="icon-right" onClick={() => context.setOpen(false)} />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          ></Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {context.data.length > 0
              ? context.data.map((formDat, i) => (
                  <>
                    <Box key={i}>
                      <>
                        <h4>
                          <strong>{formDat.label}</strong>
                        </h4>
                        <p>Respuesta: {formDat.value}</p>
                      </>
                    </Box>
                  </>
                ))
              : null}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ModalFinish;
