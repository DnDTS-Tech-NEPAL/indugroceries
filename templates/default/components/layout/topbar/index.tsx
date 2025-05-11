import Link from "next/link";
import { HStack, Text } from "@chakra-ui/react";

import { LoginDialog, RegisterDialog } from "@/components";
import { useConfigQuery, useUserProfileQuery } from "@/hooks/api";
import { useSocialLinks } from "@/hooks/app";
import { useLayoutDialogStore, useRegisterDialogStore } from "@/store";
import { VisibleSection } from "@/components/ui/visibleSection";

export const Topbar = () => {
  const { data: config } = useConfigQuery();
  const socialLinks = useSocialLinks();

  // store is used for login dialog to control open from navbar also
  const { signInOpen, updateSignInOpen } = useLayoutDialogStore();

  const { signUpOpen, updateSignUpOpen } = useRegisterDialogStore();

  const { data: userProfileData, isLoading, isError } = useUserProfileQuery();
  return (
    <>
      <HStack
        alignItems="center"
        height="48px"
        background="system.neutral.background.dark"
        px={{
          base: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "40px",
        }}
        // Only display topbar in laptop and larger resolution devices
        display={{
          base: "none",
          lg: "flex",
        }}
      >
        <HStack
          justifyContent="space-between"
          mx="auto"
          maxWidth="1280px"
          width="full"
          color="system.text.normal.dark"
        >
          <HStack gap="24px">
            <Text variant="paragraphSmall">
              Contact: {config.contact_number}
            </Text>
            <Text variant="paragraphSmall">
              Mail: {config.company_contact_email}
            </Text>
          </HStack>

          <HStack>
            <HStack gap="8px">
              <Text variant="paragraphSmall" paddingRight="2px">
                Follow us:
              </Text>

              {socialLinks.map(({ name, href, icon }) => (
                <Link key={name} href={href} aria-label={name} target="_blank">
                  {icon}
                </Link>
              ))}
            </HStack>

            {/* display either authentication menu or profile after user profile api has been fetched */}
            {!isLoading && (
              <>
                {userProfileData && !isError ? (
                  <Link href="/profile">
                    <Text
                      variant="paragraphSmall"
                      padding="4px 8px"
                      color="system.text.normal.dark"
                      cursor="pointer"
                    >
                      Profile
                    </Text>
                  </Link>
                ) : (
                  <>
                    <VisibleSection visibility={config?.register_visibility}>
                      <Text
                        variant="paragraphSmall"
                        padding="4px 8px"
                        color="system.text.normal.dark"
                        cursor="pointer"
                        onClick={() => updateSignUpOpen(true)}
                      >
                        Register
                      </Text>
                    </VisibleSection>
                    <VisibleSection visibility={config?.login_visibility}>
                      <Text
                        variant="paragraphSmall"
                        padding="4px 8px"
                        color="system.text.normal.dark"
                        cursor="pointer"
                        onClick={() => updateSignInOpen(true)}
                      >
                        Sign In
                      </Text>
                    </VisibleSection>
                  </>
                )}
              </>
            )}
          </HStack>
        </HStack>
      </HStack>

      <LoginDialog open={signInOpen} onClose={() => updateSignInOpen(false)} />

      <RegisterDialog
        open={signUpOpen}
        onClose={() => updateSignUpOpen(false)}
      />
    </>
  );
};
