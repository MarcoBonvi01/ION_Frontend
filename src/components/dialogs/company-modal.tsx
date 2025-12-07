import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";
import dayjs from "dayjs";
import { PropertyList } from "../core/property-list";
import { PropertyItem } from "../core/property-item";
import type { Company } from "../../interfaces/company";
import { Logo } from "../core/logo";
import { Box } from "@mui/material";

export const CompanyModal: React.FC<{
  handleClose: () => void;
  company: Company;
}> = ({ handleClose, company }) => {
  const logoSrc = company.logo_base64
    ? `data:image/png;base64,${company.logo_base64}`
    : undefined;

  return (
    <Dialog
      maxWidth="md"
      onClose={handleClose}
      open={true}
      sx={{
        "& .MuiDialog-container": { justifyContent: "flex-end" },
        "& .MuiDialog-paper": { height: "100%", width: "100%" },
      }}
    >
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, minHeight: 0 }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            flex: "0 0 auto",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">{company.name.toUpperCase()}</Typography>
          <IconButton onClick={handleClose}>
            <XIcon />
          </IconButton>
        </Stack>

        <Stack spacing={3} sx={{ flex: "1 1 auto", overflowY: "auto" }}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 1 }} variant="outlined">
              <PropertyList divider={<Divider />}>
                {[
                  {
                    key: "Logo",
                    value: (
                      <Box
                        alt={`${company.name} logo`}
                        height={150}
                        src={logoSrc}
                        width={220}
                        component="img"
                      />
                    ),
                  },
                  {
                    key: "Year of Incorporation",
                    value: dayjs(company.yoi).format("YYYY"),
                  },
                  {
                    key: "Head Quarter",
                    value: company.hq,
                  },
                  {
                    key: "Industry",
                    value: company.industry,
                  },
                  {
                    key: "Region",
                    value: company.region,
                  },
                  {
                    key: "Asset Class",
                    value: company.assetClass,
                  },
                  {
                    key: "Description",
                    value: company.description,
                  },
                  {
                    key: "Created at",
                    value: dayjs(company.createdAt).format("DD/MM/YYYY HH:mm"),
                  },
                ].map((item) => (
                  <PropertyItem
                    key={item.key}
                    name={item.key}
                    value={item.value}
                  />
                ))}
              </PropertyList>
            </Card>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
