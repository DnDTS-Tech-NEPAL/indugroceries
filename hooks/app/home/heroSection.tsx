"use client"
import { useConfigQuery, useHomePageQuery } from "@/hooks/api"
import { HomePageType } from "@/types"
import Image from "next/image"

export const useSliderImages = () => {
  const { data: config } = useConfigQuery()
  const { data: homeData } = useHomePageQuery()

  // Get hero type and content
  const heroType = homeData?.hero_type
  const heroContent = homeData?.content || []

  // Get all hero images from content array
  const heroImages = heroContent.map((item) => ({
    imageUrl: item.hero_image_link || config?.company_details_url || "",
    redirectUrl: item.hero_image || "#",
    title: item.hero_title || "",
    description: item.hero_description || "",
    tagline: item.hero_tagline || "",
    alignContent: item.align_content || "Left",
    backgroundColor: item.background_color || "#ffffff",
  }))

  // Fallback to main_img if no content images exist
  const fallbackImages = (Object.keys(homeData || {}) as (keyof HomePageType)[])
    .filter(
      (key) =>
        key.startsWith("main_img") &&
        key.endsWith("_url") &&
        typeof homeData?.[key as keyof HomePageType] === "string" &&
        (homeData?.[key as keyof HomePageType] as string).trim() !== "",
    )
    .map((key) => {
      const imageUrl = String(homeData?.[key] || config?.company_details_url || "")
      const redirectKey = key.replace("_url", "_redirect") as keyof HomePageType
      const redirectUrl = String(homeData?.[redirectKey] || "#")

      return {
        imageUrl,
        redirectUrl,
        title: "",
        description: "",
        tagline: "",
        alignContent: "Left",
        backgroundColor: "#ffffff",
      }
    })

  // Use hero images if available, otherwise fall back to main_img images
  const imagesToUse = heroImages.length > 0 ? heroImages : fallbackImages

  const slides = imagesToUse.map((item, index) => {
    const { imageUrl, redirectUrl, title, description, tagline, alignContent, backgroundColor } = item

    // Full Image: Just the image, full width and height
    if (heroType === "Full Image") {
      return (
        <div
          key={index}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = redirectUrl)}
        >
          <Image
            src={imageUrl || "/placeholder.svg?height=600&width=1200"}
            alt={`Banner ${index + 1}`}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>
      )
    }

    // Half Image: 50/50 split with content and image
    if (heroType === "Half Image") {
      return (
        <div
          key={index}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: alignContent === "Right" ? "row-reverse" : "row",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = redirectUrl)}
        >
          {/* Image Side */}
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
            }}
          >
            <Image
              src={imageUrl || "/placeholder.svg?height=600&width=600"}
              alt={`Banner ${index + 1}`}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
          </div>

          {/* Content Side */}
          <div
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: backgroundColor,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: alignContent === "Right" ? "flex-end" : "flex-start",
              padding: "2rem",
              textAlign: alignContent === "Right" ? "right" : "left",
            }}
          >
            {tagline && (
              <p
                style={{
                  fontSize: "1rem",
                  opacity: 0.8,
                  marginBottom: "1rem",
                  color: "#666",
                }}
              >
                {tagline}
              </p>
            )}
            {title && (
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  lineHeight: "1.2",
                  color: "#333",
                }}
              >
                {title}
              </h1>
            )}
            {description && (
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  color: "#555",
                  maxWidth: "90%",
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      )
    }

    // Full Image/Content: Full image background with overlaid content
    if (heroType === "Full Image/Content") {
      return (
        <div
          key={index}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = redirectUrl)}
        >
          {/* Background Image */}
          <Image
            src={imageUrl || "/placeholder.svg?height=600&width=1200"}
            alt={`Banner ${index + 1}`}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />

          {/* Dark overlay for readability */}
          <div
            style={{
              position: "absolute",
              inset: "0",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1,
            }}
          />

          {/* Content Overlay */}
          <div
            style={{
              position: "absolute",
              inset: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: alignContent === "Right" ? "flex-end" : "flex-start",
              padding: "2rem",
              zIndex: 2,
            }}
          >
            <div
              style={{
                maxWidth: "50%",
                color: "white",
                textAlign: alignContent === "Right" ? "right" : "left",
              }}
            >
              {tagline && (
                <p
                  style={{
                    fontSize: "1.1rem",
                    opacity: 0.9,
                    marginBottom: "1rem",
                  }}
                >
                  {tagline}
                </p>
              )}
              {title && (
                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    lineHeight: "1.2",
                  }}
                >
                  {title}
                </h1>
              )}
              {description && (
                <p
                  style={{
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    opacity: 0.9,
                  }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Default fallback (same as Full Image)
    return (
      <div
        key={index}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = redirectUrl)}
      >
        <Image
          src={imageUrl || "/placeholder.svg?height=600&width=1200"}
          alt={`Banner ${index + 1}`}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>
    )
  })

  return slides
}
