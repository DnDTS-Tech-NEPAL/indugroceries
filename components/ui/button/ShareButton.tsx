// import { HStack, Text } from "@chakra-ui/react";

// import { ShareIcon } from "@/assets/svg";

// export const ShareButton = () => {
//   return (
//     <HStack gap="4px">
//       <Text color="black" variant="subtitle2">
//         Share
//       </Text>
//       <ShareIcon />
//     </HStack>
//   );
// };
"use client";
import { ShareIcon } from "@/assets/svg";
import React, { useRef, CSSProperties } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { toaster } from "../toaster";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { Link2 } from "lucide-react";

interface ShareButtonProps {
  title?: string;
  url: string;
  className?: string;
  style?: CSSProperties;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  // title,
  url,
  className = "",
  style = {},
}) => {
  // const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const encodedUrl = encodeURIComponent(url);
  // const encodedText = encodeURIComponent(`Check this out: ${title}`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toaster.create({
        title: "Link copied to clipboard!",
        duration: 3000,
        type: "success",
      });
      // setOpen(false);
    } catch {
      toaster.create({
        title: "Failed to copy the link.",
        duration: 3000,
        type: "error",
      });
    }
  };

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
  //       setOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <div
      ref={menuRef}
      style={{ position: "relative", display: "flex", ...style }}
      className={className}
    >
      <VStack gap={0} alignItems="left">
        <HStack gap={0} color={"black"}>
          {/* <button
        onClick={() => setOpen(!open)}
        style={{
          // padding: "10px 16px",

          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      > */}
          <ShareIcon />
          {/* </button> */}
          <Text>Share this product</Text>
        </HStack>

        {/* {open && ( */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            position: "absolute",
            top: "110%",
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: "10px",
            zIndex: 1000,
            width: "fit-content",
          }}
        > */}
        <HStack gap={0} p={0} alignItems="center">
          <a
            href={`https://wa.me/?text=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={menuLinkStyle}
          >
            <FaWhatsapp size={20} color={"#4CAF50"} />
          </a>
          {/* <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={menuLinkStyle}
          >
            <FaFacebook size={20} color={"blue"} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={menuLinkStyle}
          >
            <FaXTwitter size={20} color={"black"} />
          </a> */}
          <button
            onClick={handleCopy}
            style={{
              ...menuLinkStyle,
              border: "none",
              background: "#cfeacfff",
              borderRadius: "2rem",
              textAlign: "left",
              marginLeft: "2px",
              rotate: "-51deg",
            }}
          >
            <Link2 size={15} color="green" />
          </button>
        </HStack>
        {/* </div> */}
        {/* )} */}
      </VStack>
    </div>
  );
};

const menuLinkStyle: React.CSSProperties = {
  display: "block",
  padding: "2px",
  margin: "2px",
  color: "#333",
  textDecoration: "none",
  cursor: "pointer",
};

export default ShareButton;
