import { Box } from '@mui/material';
import { ITabPanelProps } from '../../core/types/tabs';

export const CustomTabPanel: React.FC<ITabPanelProps> = (
  props: ITabPanelProps
): JSX.Element => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
