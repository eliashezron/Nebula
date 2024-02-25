# Nebula: Smart Contract Safety Analysis Tool Documentation

## Overview

Nebula is a dynamic analysis tool designed to assess and score the safety of smart contracts. By utilizing a comprehensive set of parameters, Nebula evaluates the security posture of smart contracts to inform users about potential risks before they engage with the contract. Nebula currently leverages data from the Voyager API and is expanding its capabilities with the StarkScan APIs for enriched safety assessments.

## Features

Nebula provides the following features to its users:

- **Safety Score Assessment**: Calculates a safety score based on contract parameters and historical data.
- **Comprehensive Analysis**: Utilizes various data points to evaluate the security level of a smart contract.
- **User-Friendly Interface**: Simplifies the complexity of smart contract analytics into an understandable format for end-users.
- **Expandable Data Sources**: Integrates multiple APIs to gather a wide range of contract insights.

## Data Fields

Below is the list of data fields that Nebula utilizes to perform its analysis, along with their current implementation status:

- [x] `address`: Contract address (Completed)
- [x] `chain`: Blockchain identifier (Completed)
- [ ] `circulation`: Number of tokens in circulation
- [ ] `classHash`: Unique identifier for the contract class
- [ ] `code`: Smart contract code in JSON format
- [x] `creationTimestamp`: Contract creation timestamp (Completed)
- [ ] `highRisks`: Quantity of high-risk factors identified
- [ ] `holders`: Number of token holders
- [x] `id`: Unique identifier for the contract entry (Completed)
- [x] `isAccount`: Indicator if the address is an account (Completed)
- [x] `isERC20`: Boolean indicating ERC20 compliance (Completed)
- [x] `isProxy`: Indicator if the contract is a proxy (Completed)
- [ ] `isRisky`: Overall risk status of the contract
- [ ] `liquidity`: Available liquidity measurement
- [ ] `lowRisks`: Quantity of low-risk factors identified
- [x] `name`: Contract or token name (Completed)
- [ ] `price`: Current price of the token
- [ ] `safetyScore`: Calculated safety score
- [x] `symbol`: Token symbol (Completed)
- [ ] `topHoldersPercentage`: Percentage of tokens held by the top holders
- [ ] `tvl`: Total value locked in the contract
- [x] `views`: Number of times the contract has been viewed (Completed)

## Risk Levels

Nebula categorizes risks into three levels, each with specific criteria:

### High Risk

- No previous scams by owner's wallet found.
- Smart contract's transfer function is secure with an unchangeable router.
- No mintable risks detected.
- No significant liquidity rugpull risk found.
- Total value locked is reported.

### Moderate Risk

- Users have the ability to transfer their tokens at all times.
- The contract operates without imposing custom fees.
- There are recent user interactions with the smart contract.

### Low Risk

- No locks or restrictions detected in token transferability.
- The contract logic is immutable and cannot be upgraded post-deployment.
- Recent contract interactions are present, indicating active usage.

## Integration with StarkScan APIs

Nebula is enhancing its analysis capabilities by integrating StarkScan APIs. This integration aims to provide more accurate and up-to-date information about smart contracts, enabling better risk assessments and safety scores.

## Conclusion

Nebula serves as a critical tool for users and investors within the blockchain ecosystem to understand and mitigate risks associated with smart contracts. Through its evolving analytics and user-centric approach, Nebula strives to contribute to a safer blockchain environment.

## Future Updates

Nebula is actively being developed to expand its database and analytical capabilities. Future updates will focus on incorporating more real-time data, improving risk algorithms, and refining the user experience. Users are encouraged to provide feedback and suggestions for new features.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
