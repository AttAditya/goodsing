import { useState } from "react";

import { Container } from "@components/core/Container";
import { Block } from "@components/core/Block";
import { TextContent } from "@components/core/TextContent";
import { IconButton } from "@components/core/IconButton";

export function Navbar() {
  const tabs = ['Karaoke', 'Throne'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Container className="navbar">
      <Container className="navbar-tabs">
        {tabs.map((tab) => (
          <Block
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "navbar-tab",
              tab === activeTab ? "active" : "",
            ].join(" ")}
          >
            <TextContent>{tab}</TextContent>
          </Block>
        ))}
      </Container>

      <Container className="navbar-profile">
        <IconButton
          icon="IdCard"
          variant="secondary"
          size="small"
        />
      </Container>
    </Container>
  );
}

