import { test, beforeEach, afterEach } from "vitest";
import { e, FSWorld, FSWallet, FSContract } from "xsuite";

let world: FSWorld;
let deployer: FSWallet;
let contract: FSContract;

beforeEach(async () => {
  world = await FSWorld.start();
  deployer = await world.createWallet({
    balance: 10n ** 18n,
  });
  contract = await deployer.createContract({
    code: "file:output/contract.wasm",
    codeMetadata: [],
    kvs: {
      esdts: [
        { id: "TOKEN-ABCDEF", roles: ["ESDTRoleLocalMint"] },
      ]
    }
  });
});

afterEach(async () => {
  world.terminate();
});

test("Tx with mint", async () => {
  await deployer.callContract({
    callee: contract,
    funcName: "esdt_local_mint",
    funcArgs: [
      e.Str("TOKEN-ABCDEF"),
      e.U64(0),
      e.U(10000n),
    ],
    gasLimit: 10_000_000,
  });
});

test("Query with mint", async () => {
  await deployer.query({
    callee: contract,
    funcName: "esdt_local_mint",
    funcArgs: [
      e.Str("TOKEN-ABCDEF"),
      e.U64(0),
      e.U(10000n),
    ],
  });
});
