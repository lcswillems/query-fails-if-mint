Install the dependencies:

```
npm install
```

To run the tests:

```
npm run test
```

(Optional) To build the SC:

```
npm run build
```

**The endpoint:**

In `src/lib.rs`:

```
#[endpoint]
fn esdt_local_mint(
    &self,
    token_identifier: TokenIdentifier,
    nonce: u64,
    amount: BigUint,
) {
    self.send().esdt_local_mint(&token_identifier, nonce, &amount);
}
```

**The test:**

In `tests/contract.test.ts`:

```
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
```

**The error:**

```
Error: Query failed: execution failed - operation in account not permitted - Result:
{
  "returnData": null,
  "returnCode": "execution failed",
  "returnMessage": "operation in account not permitted",
  "gasRemaining": 0,
  "gasRefund": 0,
  "outputAccounts": {},
  "deletedAccounts": null,
  ...
}
```