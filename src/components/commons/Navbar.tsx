import { useRoutes } from "@contexts/Routes";

import { Container } from "@components/core/Container";
import { Block } from "@components/core/Block";
import { TextContent } from "@components/core/TextContent";
import { IconButton } from "@components/core/IconButton";

export function Navbar() {
  const tabs = ['Karaoke', 'Throne'];
  const { activeRoute, navigate } = useRoutes();

  return (
    <Container classNames={["navbar"]}>
      <Container classNames={["navbar-tabs"]}>
        {tabs.map((tab) => (
          <Block
            key={tab}
            onClick={() => navigate(tab.toLowerCase())}
            classNames={[
              "navbar-tab",
              tab.toLowerCase() === activeRoute ? "active" : "",
            ]}
          >
            <Container
              classNames={[
                "navbar-tab-after",
                tab.toLowerCase() === activeRoute ? "active" : "",
              ]}
            />
            <TextContent>{tab}</TextContent>
          </Block>
        ))}
      </Container>

      <Container classNames={["navbar-profile"]}>
        <IconButton
          icon="IdCard"
          variant="secondary"
          size="small"
        />
      </Container>
    </Container>
  );
}

