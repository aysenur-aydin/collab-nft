## 🎨 Collab-NFT — Collaborative NFT dApp

Collab-NFT is a collaborative Web3 dApp project where multiple users can
contribute pixel data to create a collective artwork NFT. Once completed, the
artwork is minted as an NFT, and revenue from the NFT sale is distributed fairly
among all contributors.

## Tech Stack

This project is built on the Sui Blockchain.

- [React](https://react.dev/) as the UI framework
- [TypeScript](https://www.typescriptlang.org/) for type checking
- [Vite](https://vitejs.dev/) for build tooling
- [Radix UI](https://www.radix-ui.com/) for pre-built UI components
- [ESLint](https://eslint.org/)
- [`@mysten/dapp-kit`](https://sdk.mystenlabs.com/dapp-kit) for connecting to
  wallets and loading data
- [pnpm](https://pnpm.io/) for package management

## Features

- Users can contribute pixels to a shared canvas.
- Completed artwork is minted as an NFT.
- Wallet connection and on-chain interaction supported.
- NFT sale revenue is distributed among contributors.
- Modern, fast and accessible frontend experience.

## Future Plans

Collab-NFT is continuously evolving to enhance the collaborative art creation
experience. Our future plans include:

- Multiple Artwork Support: Enable the creation of multiple collective artworks
  simultaneously, allowing users to participate in various projects.
- Enhanced Contributor Management: Implement features to define roles and
  permissions for contributors within each artwork (e.g., view-only, pixel
  contribution, color palette suggestions).
- Contribution Evaluation Mechanisms: Integrate different algorithms and voting
  systems to evaluate and reward user contributions, ensuring fairer revenue
  distribution that reflects individual effort.
- Interactive Features: Introduce real-time interaction capabilities for users
  on the canvas, such as chat, suggestion tools, and pixel highlighting.
- Theme and Palette Management: Allow the creation and suggestion of custom
  themes and color palettes for each artwork, increasing the diversity of
  creations.
- Community Governance Tools: Integrate tools to facilitate community
  communication and collaboration, such as forums, voting mechanisms, and
  announcement systems.
- NFT Sale Mechanisms: Support various NFT sale methods beyond fixed prices,
  such as auctions, to optimize the value discovery of the artwork.
- Advanced User Profiles: Develop detailed user profiles showcasing their
  contributions to different artworks, earnings, and community reputation.
  Potential Future Blockchain Integrations: As the Sui ecosystem grows and based
  on community feedback, explore integrations with other blockchain
  technologies.

## To set up the project:

To install dependencies you can run

```bash
pnpm install
```

To start your dApp in development mode run

```bash
pnpm dev
```

## Building

To build your app for deployment you can run

```bash
pnpm build
```
