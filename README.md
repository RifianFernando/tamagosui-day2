# Tamagosui Sui Contract

A simple Tamagotchi-like game built on the Sui blockchain, created during the Sui Community Bootcamp Workshop Batch 2. Adopt your own digital pet, care for it, and watch it evolve!

## Features

- **Adopt a Pet:** Mint your unique Tamagosui pet.
- **Care for your Pet:** Feed, play with, and put your pet to sleep.
- **Earn Coins:** Send your pet to work to earn coins.
- **Level Up:** Gain experience and level up your pet.
- **Accessories:** Mint and equip accessories to customize your pet's appearance.
- **Dynamic Images:** The pet's image URL changes based on its level and equipped accessories.

## Project Structure

```
.
├── Move.lock
├── Move.toml
├── build
├── sources
│   └── tamagosui.move
└── tests
    └── tamagosui_contract_tests.move
```

- `sources/tamagosui.move`: The core logic of the Tamagosui smart contract.
- `tests/tamagosui_contract_tests.move`: Tests for the smart contract.

## Getting Started

### Prerequisites

- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install)

### Build

To build the contract, run the following command from the root directory:

```bash
sui move build
```

### Test

To run the tests for the contract:

```bash
sui move test
```

## Contract Overview

### Structs

- `Pet`: The main object representing a digital pet. It contains its stats and game data.
- `PetAccessory`: Represents an accessory that can be equipped on a pet.
- `PetStats`: Stores the pet's core stats: `energy`, `happiness`, and `hunger`.
- `PetGameData`: Stores the pet's game-related data: `coins`, `experience`, and `level`.
- `GameBalance`: A struct holding the game's balance constants (e.g., costs, gains for actions).

### Entry Functions

These are the main functions you can call to interact with the contract.

- `adopt_pet(name: String)`: Adopts a new pet with the given name.
- `feed_pet(pet: &mut Pet)`: Feeds the pet, increasing its hunger stat and experience, at the cost of some coins.
- `play_with_pet(pet: &mut Pet)`: Plays with the pet, increasing its happiness and experience, while decreasing energy and hunger.
- `work_for_coins(pet: &mut Pet)`: Sends the pet to work, increasing its coins and experience, but decreasing energy, happiness, and hunger.
- `let_pet_sleep(pet: &mut Pet)`: Puts the pet to sleep to recover energy. The pet's image changes to a sleeping state.
- `wake_up_pet(pet: &mut Pet)`: Wakes the pet up. Stats are recalculated based on sleep duration.
- `check_and_level_up(pet: &mut Pet)`: Levels up the pet if it has enough experience. The pet's image may change upon leveling up.
- `mint_accessory()`: Mints a new `PetAccessory` (e.g., "cool glasses").
- `equip_accessory(pet: &mut Pet, accessory: PetAccessory)`: Equips an accessory on the pet, changing its appearance.
- `unequip_accessory(pet: &mut Pet)`: Unequips an accessory from the pet.
- `cheat(pet: &mut Pet)`: (For testing/development) Instantly maximizes the pet's stats and gives a large amount of coins and experience.

### View Functions

These functions allow you to read data from the contract without creating a transaction.

- `get_pet_name(pet: &Pet): String`
- `get_pet_adopted_at(pet: &Pet): u64`
- `get_pet_coins(pet: &Pet): u64`
- `get_pet_experience(pet: &Pet): u64`
- `get_pet_level(pet: &Pet): u8`
- `get_pet_energy(pet: &Pet): u8`
- `get_pet_hunger(pet: &Pet): u8`
- `get_pet_happiness(pet: &Pet): u8`
- `get_pet_stats(pet: &Pet): (u8, u8, u8)`
- `get_pet_game_data(pet: &Pet): (u64, u64, u8)`
- `is_sleeping(pet: &Pet): bool`

### Events

- `PetAdopted`: Emitted when a new pet is adopted.
- `PetAction`: Emitted for various actions like feeding, playing, working, etc.

### Error Codes

- `E_NOT_ENOUGH_COINS`: User does not have enough coins for an action.
- `E_PET_NOT_HUNGRY`: Pet is not hungry enough to be fed.
- `E_PET_TOO_TIRED`: Pet is too tired for an action.
- `E_PET_TOO_HUNGRY`: Pet is too hungry for an action.
- `E_ITEM_ALREADY_EQUIPPED`: An accessory is already equipped.
- `E_NO_ITEM_EQUIPPED`: No accessory is equipped to be unequipped.
- `E_NOT_ENOUGH_EXP`: Pet does not have enough experience to level up.
- `E_PET_IS_ASLEEP`: Action cannot be performed while the pet is asleep.
- `E_PET_IS_ALREADY_ASLEEP`: Cannot put a pet to sleep that is already sleeping.
