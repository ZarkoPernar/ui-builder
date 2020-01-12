import { Stack, Inline } from "./components/General/Layout";
import { Button, Alert } from "./components/General/General";
import { Text } from "./components/Text/Text";

export default {
  div: {
    component: "div"
  },
  Stack: {
    component: Stack,
    props: [
      {
        name: "space",
        availableValues: ["medium", "small", "large"]
      }
    ]
  },
  Text: {
    component: Text
  },
  Inline: {
    component: Inline,
    props: [
      {
        name: "space",
        availableValues: ["medium", "small", "large"]
      }
    ]
  },
  Button: {
    component: Button,
    props: [
      {
        name: "color",
        availableValues: ["primary", "default", "success"]
      }
    ]
  },
  Alert: {
    component: Alert
  }
};
