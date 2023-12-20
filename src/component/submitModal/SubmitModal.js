import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Modal } from "@mui/joy";

import Sheet from "@mui/joy/Sheet";

export default function SubmitModal({ open, setOpen }) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant='outlined'
          sx={{
            maxWidth: 500,
            minWidth: 300,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              lineHeight: "0.4rem",
              padding: "1rem 3rem",
            }}
          >
            <CheckCircleIcon
              style={{ fontSize: "2rem", fill: " rgb(21, 98, 253)" }}
            />
            <h4>Submitted</h4>
          </div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
