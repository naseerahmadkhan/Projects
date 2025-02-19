import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import { styled } from "@mui/material/styles"
import EditIcon from '@mui/icons-material/Edit';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}))

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

const TodoPreviewModal = ({ show, handleShowModal, data }) => {
  console.log("data getting in preview", data)
  return (
    <div>
      <Modal
        open={show}
        onClose={handleShowModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {data.todoName}
            </Typography>
            <IconButton aria-label="close" onClick={handleShowModal}>
              <EditIcon />
            </IconButton>
          </Box>

          <Stack sx={{ display: "flex" }} spacing={3}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Chip label={`${new Date(data.date)}`} />
                  <Chip
                    label={data.completed ? "Completed" : "Pending"}
                    variant="outlined"
                  />
                </Grid>
              </Box>
            </Box>
            <Box md={{ flexGrow: 1 }}>
              {data?.contents?.html && (
                <div
                  style={{ padding: "5%" }}
                  dangerouslySetInnerHTML={{ __html: data.contents.html }}
                />
              )}
            </Box>

            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ width: "50%" }}
                variant="contained"
                endIcon={<CloseIcon />}
                onClick={handleShowModal}
              >
                Close
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default TodoPreviewModal
