import { createStitches, globalCss } from "@stitches/react"
import { Colors } from "./Colors"

const { styled } = createStitches({
  media: {
    SMALL: "(min-width: 320px) and (max-width: 499px)",
    MEDIUM: "(min-width: 500px) and (max-width: 767px)",
    LARGE: "(min-width: 768px)",
  },
})

export const globalStyle = globalCss({
  "*": {
    padding: 0,
    margin: 0,
    color: "inherit",
    textDecoration: "none",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  button: {
    cursor: "pointer",
  },
  a: {
    cursor: "pointer",
  },
})

export const View = styled("div", {
  display: "flex",
  flexDirection: "column",
  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
    },
    position: {
      fixed: {
        position: "fixed",
      },
      relative: { position: "relative", zIndex: 2 },
      absolute: {
        position: "absolute",
      },
    },
    type: {
      shadow: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, .1)",
      },
      fullPage: { width: "100%", height: "100vh", alignItems: "center", justifyContent: "center" },
    },
  },
})

export const Button = styled("button", {
  display: "flex",
  flexDirection: "column",
  padding: 10,
  minHeight: 40,
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: Colors.WHITE,
  color: Colors.BLACK,
  variants: {
    border: {
      off: { border: "none" },
    },
    colors: {
      BLACK: {
        backgroundColor: Colors.BLACK,
        borderColor: Colors.BLACK,
        color: Colors.WHITE,
      },
      RED: {
        backgroundColor: Colors.RED,
        borderColor: Colors.RED,
        color: Colors.WHITE,
      },
      BLUE: {
        backgroundColor: Colors.BLUE,
        borderColor: Colors.BLUE,
        color: Colors.WHITE,
      },
      GRAY: {
        backgroundColor: Colors.GRAY,
        borderColor: Colors.GRAY,
        color: Colors.WHITE,
      },
      LIGHTGRAY: {
        backgroundColor: Colors.LIGHTGRAY,
        borderColor: Colors.LIGHTGRAY,
        color: Colors.GRAY,
      },
    },
  },
})

export const Typo = styled("p", {
  textAlign: "left",
  variants: {
    textAlign: {
      right: {
        textAlign: "right",
      },
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
    },
    size: {
      SMALL: {
        fontSize: 10,
      },
      PRIMARY: {
        fontSize: 16,
      },
      LARGE: {
        fontSize: 20,
      },
    },
    weight: {
      THIN: {
        fontWeight: "300",
      },
      PRIMARY: {
        fontWeight: "400",
      },
      BOLD: {
        fontWeight: "600",
      },
      HEAVY: {
        fontWeight: "900",
      },
    },
  },
})
