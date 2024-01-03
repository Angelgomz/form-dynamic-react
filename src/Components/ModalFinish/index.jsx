import { useContext } from "react";
import { ModalFinishContext } from "../../Context";
import Box from "@mui/material/Box";
import { FaX } from "react-icons/fa6";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import './index.css'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalFinish = () => {
  const context = useContext(ModalFinishContext); 
 
  return (
    <div>
      <Modal
        open={context.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <FaX className="icon-right" onClick={() => context.setOpen(false)}/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {context.data.length > 0 ? context.data.map(function(formDat,i) {
              return (
                  <>
                  <Box key={i}>
                         <>
                          <h4><strong>{formDat.label}</strong></h4>
                          <h5><strong>Respuesta: {formDat.value}</strong></h5>
                         </>
                  </Box>
                  </>
                );
            }) : ''}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalFinish;
