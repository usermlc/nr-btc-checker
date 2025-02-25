# Node-RED BTC Checker

## Installation

Install the node locally with:

```bash
npm i ~/path/to/package
```

## Usage

1. Add the **BTC Checker** node to your flow.
2. Set the **Input Property** where the Bitcoin address is located (default: `msg.payload`).
3. Set the **Output Property** where the result will be stored (default: `msg.payload`).

The result will contain:
- **balance**: Current BTC balance.
- **transactions**: Number of transactions.
- **address**: Bitcoin address checked.

## Example Flow

1. **Inject node**:
    - Payload: `"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"`
2. **BTC Checker node**:
    - Input Property: `payload`
    - Output Property: `payload`
3. **Debug node**:
    - Show `msg.payload` in the debug pane.

## Example Output

For a balance:

```json
{
  "balance": 0.0123,
  "transactions": 35,
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

For no balance:

```json
{
  "balance": 0,
  "transactions": 0,
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

## Troubleshooting

- Ensure all dependencies are installed.
- Verify the Bitcoin address is correctly formatted.

## License

[MIT License](LICENSE)
