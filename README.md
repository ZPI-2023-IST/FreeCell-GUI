# FreeCell-GUI

## To install:
```bash
npm install
```

## To launch:
```bash
npm run dev
```
And open [http://localhost:5005](http://localhost:5005)

## Goal
In this repo, our goal will be to visualize the whole game on the web page.

From the frontend part, this repo will receive JSON with boards.

## JSON Structure:

```json
[
  {
    "FreeCells": [null, null, null, null],
    "Stack": {
      "h": null,
      "d": null,
      "c": null,
      "s": null
    },
    "Board": [
      ["J of h", "8 of s", "5 of d", "Q of h", "9 of c", "K of d"],
      ["2 of c", "8 of c", "3 of h", "4 of h", "4 of d", "7 of c"],
      ["Q of s", "8 of h", "2 of h", "3 of s", "6 of s", "A of h"],
      ["6 of d", "7 of h", "9 of h", "T of s", "J of s", "5 of s"],
      ["A of s", "T of c", "K of h", "6 of h", "Q of c", "K of s", "K of c"],
      ["Q of d", "2 of s", "2 of d", "J of c", "A of d", "9 of d", "9 of s"],
      ["T of h", "A of c", "5 of c", "8 of d", "T of d", "5 of h", "6 of c"],
      ["4 of s", "J of d", "3 of d", "3 of c", "7 of d", "7 of s", "4 of c"]
    ]
  },
  {
    "FreeCells": [null, null, null, "K of d"],
    "Stack": {
      "h": null,
      "d": null,
      "c": null,
      "s": null
    },
    "Board": [
      ["J of h", "8 of s", "5 of d", "Q of h", "9 of c"],
      ["2 of c", "8 of c", "3 of h", "4 of h", "4 of d", "7 of c"],
      ["Q of s", "8 of h", "2 of h", "3 of s", "6 of s", "A of h"],
      ["6 of d", "7 of h", "9 of h", "T of s", "J of s", "5 of s"],
      ["A of s", "T of c", "K of h", "6 of h", "Q of c", "K of s", "K of c"],
      ["Q of d", "2 of s", "2 of d", "J of c", "A of d", "9 of d", "9 of s"],
      ["T of h", "A of c", "5 of c", "8 of d", "T of d", "5 of h", "6 of c"],
      ["4 of s", "J of d", "3 of d", "3 of c", "7 of d", "7 of s", "4 of c"]
    ]
  }
]
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!