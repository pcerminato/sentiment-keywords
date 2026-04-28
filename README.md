## Tables and data

The _original_ list has a format that responds to the type `Lists`:

```
{
  lists: {
    accepted: ["health", "nutrition"],
    denied: ["diabetes", "obesity"]
  }
}
```

On the other hand, the REST endpoint `/ai` returns a format that responds to the type `MapLists`:

```
{
  "lists": {
    "accepted": {
      "health": [
        "wellbeing",
        "wellness",
        "vitality"
      ],
      "nutrition": [
        "nourishment",
        "diet",
        "balanced diet",
        "eating habits"
      ],
    },
    "denied": {
      "diabetes": [
        "high blood sugar",
        "glucose levels",
        "blood glucose",
      ],
      "obesity": [
        "overweight",
        "excess weight",
        "weight gain"
      ]
    }
  }
}
```

In order to make this data format readable for the `<TablesView />`, it needs to be transformed with the utility function `flatFormatLists()`.

## The /ai endpoint response data format

This endpoint receives the original list as an input and it returns an enriched and expanded list. The format though
is a map. A map is used as a way of classifying the data: the keys are the original words and the values are the lists of expanded words (see example above).

That way, the `flatFormatLists()` transforms the structure to a regular list compatible with the `Lists` type and also adds an `<em>` tag to emphasyse the orignial words. At that level the `<em>` is a string, but it is parsed to an html element using the `parseHtml()` utility in the `<WordsTable />`.

