// PolyCode — Hugging Face (Python) full curriculum
// 9 chapters · 25 lessons · Python coding challenges
// YouTube links: edit huggingfaceVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { HUGGINGFACE_VIDEO_LINKS } from "./huggingfaceVideoLinks";
import { HUGGINGFACE_LESSON_OUTCOMES } from "./huggingfaceLessonOutcomes";

export const HUGGINGFACE_CHAPTERS = [
  {
    id: "intro",
    title: `Meet Hugging Face`,
    icon: "🤗",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-0",
        title: `What is Hugging Face?`,
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              `**Hugging Face** is the open hub for machine learning — a website with 500,000+ pretrained **models**, ready-made **datasets**, and Python libraries that make using them almost as easy as calling a function.`,
          },
          {
            type: "scenario",
            title: `Adding review sentiment to an app`,
            content:
              `Your app collects product reviews and you want a "positive / negative" badge on each one. Instead of training a model from scratch, you can download an already-trained model from the Hub and run it in a few lines.`,
          },
          {
            type: "diagram",
            title: `The Hugging Face ecosystem`,
            nodes: [
              {
                id: "hub",
                label: `Hub`,
                color: "#FF9D00",
                items: [`Models`, `Datasets`, `Spaces`],
              },
              {
                id: "libs",
                label: `Libraries`,
                color: "#FFB84D",
                items: [`transformers`, `tokenizers`, `datasets`],
              },
              {
                id: "app",
                label: `Your app`,
                color: "#FFD180",
                items: [`pipeline() calls`, `Fine-tuned models`],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Everything in this course installs with \`pip install transformers datasets\`. No account is required to load public models.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Your first pipeline`,
            content: `from transformers import pipeline

classifier = pipeline("sentiment-analysis")
print(classifier("Hugging Face makes NLP easy!"))`,
          },
          {
            type: "quiz",
            question: `What does Hugging Face mainly provide?`,
            options: [
              `A hosted SQL database`,
              `Pretrained ML models, datasets, and libraries to use them`,
              `A JavaScript UI framework`,
              `A video editing tool`,
            ],
            answer: 1,
            explanation:
              `Hugging Face hosts models and datasets on its Hub, plus Python libraries (transformers, datasets, tokenizers) to use them easily.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Your First Pipeline`,
          description:
            `Import \`pipeline\` from \`transformers\`, create \`classifier = pipeline("sentiment-analysis")\`, and print the result of classifying \`"I love this course!"\`.`,
          starterCode: `# Import pipeline
# Create classifier and print a result

`,
          solutionCode: `from transformers import pipeline

classifier = pipeline("sentiment-analysis")
print(classifier("I love this course!"))`,
          tests: [
            {
              id: 1,
              label: `Imports pipeline`,
              keywords: [{ pattern: `from\\s+transformers\\s+import\\s+pipeline` }],
            },
            {
              id: 2,
              label: `Creates a sentiment-analysis pipeline`,
              keywords: [{ pattern: `pipeline\\s*\\(\\s*["']sentiment-analysis["']` }],
            },
            {
              id: 3,
              label: `Prints a classification`,
              keywords: [{ pattern: `print\\s*\\(\\s*classifier\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-1",
        title: `Installing & pipeline() quickstart`,
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              `Install once with **\`pip install transformers\`**. The first time you run a pipeline for a task, it downloads a sensible **default model** for you — later calls reuse the cached copy.`,
          },
          {
            type: "scenario",
            title: `Hackathon prototype`,
            content:
              `You have two hours to demo an idea. \`pipeline()\` lets you go from "I need text generation" to working code without picking an architecture, writing training code, or hosting anything.`,
          },
          {
            type: "table",
            title: `Manual approach vs. pipeline()`,
            columns: [`Step`, `Without pipeline()`, `With pipeline()`],
            rows: [
              { label: `Choose model`, values: [`Choose model`, `Research architectures`, `Skip — default picked for you`] },
              { label: `Tokenize`, values: [`Tokenize`, `Write encode/decode code`, `Handled internally`] },
              { label: `Post-process`, values: [`Post-process`, `Apply softmax, map labels`, `Handled internally`] },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `The first pipeline call for a task downloads model weights from the Hub — it needs an internet connection and can take a moment.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Pick a specific model`,
            content: `from transformers import pipeline

generator = pipeline(
    "text-generation",
    model="distilgpt2",
)
print(generator("Once upon a time", max_new_tokens=20))`,
          },
          {
            type: "quiz",
            question: `What happens the first time you run pipeline("sentiment-analysis")?`,
            options: [
              `Nothing, it fails without a model argument`,
              `It downloads and caches a default model for that task`,
              `It trains a new model from scratch`,
              `It only works offline`,
            ],
            answer: 1,
            explanation:
              `Every task has a sensible default model that pipeline() downloads and caches on first use.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Text Generation Pipeline`,
          description:
            `Create \`generator = pipeline("text-generation", model="distilgpt2")\` and print the result of generating from \`"Once upon a time"\` with \`max_new_tokens=20\`.`,
          starterCode: `from transformers import pipeline

`,
          solutionCode: `from transformers import pipeline

generator = pipeline("text-generation", model="distilgpt2")
print(generator("Once upon a time", max_new_tokens=20))`,
          tests: [
            {
              id: 1,
              label: `Creates a text-generation pipeline`,
              keywords: [{ pattern: `pipeline\\s*\\(\\s*["']text-generation["']` }],
            },
            {
              id: 2,
              label: `Passes max_new_tokens`,
              keywords: [{ pattern: `max_new_tokens\\s*=` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "transformers",
    title: `Transformers Library`,
    icon: "🧩",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-2",
        title: `The pipeline() function`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `\`pipeline(task)\` wraps three steps into one call: **tokenize** the input, **run the model**, and **post-process** raw output into something readable. Pass a list of strings to process a batch at once.`,
          },
          {
            type: "scenario",
            title: `Support ticket triage`,
            content:
              `A helpdesk gets hundreds of tickets a day. A \`"zero-shot-classification"\` or \`"sentiment-analysis"\` pipeline can sort them into buckets before a human even opens the queue.`,
          },
          {
            type: "table",
            title: `Common pipeline tasks`,
            columns: [`Task name`, `What it does`],
            rows: [
              { label: `sentiment-analysis`, values: [`sentiment-analysis`, `Label text as positive/negative`] },
              { label: `summarization`, values: [`summarization`, `Shorten a long passage`] },
              { label: `question-answering`, values: [`question-answering`, `Extract an answer span from context`] },
              { label: `ner`, values: [`ner`, `Find names, places, organizations`] },
              { label: `fill-mask`, values: [`fill-mask`, `Predict a missing word`] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Pass a list instead of a single string — \`classifier(["Great!", "Terrible."])\` — to classify a whole batch in one call.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Question answering`,
            content: `from transformers import pipeline

qa = pipeline("question-answering")
result = qa(
    question="Where is the Hugging Face Hub?",
    context="The Hugging Face Hub is a website that hosts models and datasets.",
)
print(result["answer"])`,
          },
          {
            type: "quiz",
            question: `What does a sentiment-analysis pipeline return for a batch of texts?`,
            options: [
              `A single averaged score`,
              `A list of dicts, one per input text`,
              `A raw tensor of logits`,
              `Nothing — batches are not supported`,
            ],
            answer: 1,
            explanation:
              `Pipelines return one result dict (label + score) per input, in the same order as the input list.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Summarize a Paragraph`,
          description:
            `Create \`summarizer = pipeline("summarization")\` and print the result of summarizing a short paragraph of your choice.`,
          starterCode: `from transformers import pipeline

`,
          solutionCode: `from transformers import pipeline

summarizer = pipeline("summarization")
text = "Hugging Face provides open source tools for natural language processing, including pretrained models and datasets that make it easy to build ML applications quickly."
print(summarizer(text))`,
          tests: [
            {
              id: 1,
              label: `Creates a summarization pipeline`,
              keywords: [{ pattern: `pipeline\\s*\\(\\s*["']summarization["']` }],
            },
            {
              id: 2,
              label: `Prints a summary`,
              keywords: [{ pattern: `print\\s*\\(\\s*summarizer\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-3",
        title: `AutoModel & AutoTokenizer`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `**\`Auto*\`** classes figure out the right architecture from a model name automatically. \`AutoTokenizer\` loads the matching tokenizer; \`AutoModelForSequenceClassification\` loads a model with a classification head.`,
          },
          {
            type: "scenario",
            title: `Swapping models without rewriting code`,
            content:
              `Today you use a small DistilBERT model. Next month you want to try a bigger RoBERTa checkpoint. With \`Auto*\` classes, you only change the model name string — the loading code stays the same.`,
          },
          {
            type: "diagram",
            title: `Loading a model pair`,
            nodes: [
              {
                id: "name",
                label: `Model name`,
                color: "#FF9D00",
                items: [`"distilbert-base-..."`],
              },
              {
                id: "tok",
                label: `AutoTokenizer`,
                color: "#FFB84D",
                items: [`.from_pretrained(name)`],
              },
              {
                id: "mod",
                label: `AutoModel...`,
                color: "#FFD180",
                items: [`.from_pretrained(name)`],
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              `\`from_pretrained()\` downloads weights once and caches them locally — later calls with the same name load from disk.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Load a matching pair`,
            content: `from transformers import AutoTokenizer, AutoModelForSequenceClassification

name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)
print(model.config.num_labels)`,
          },
          {
            type: "quiz",
            question: `Why use AutoTokenizer instead of a specific tokenizer class?`,
            options: [
              `It is faster at runtime`,
              `It picks the correct tokenizer class for whatever model name you give it`,
              `It skips downloading files`,
              `It only works with images`,
            ],
            answer: 1,
            explanation:
              `Auto* classes inspect the model name/config and instantiate the matching class for you.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load Tokenizer and Model`,
          description:
            `Import \`AutoTokenizer\` and \`AutoModelForSequenceClassification\`. Load both from \`"distilbert-base-uncased-finetuned-sst-2-english"\` and print \`model.config.num_labels\`.`,
          starterCode: `from transformers import AutoTokenizer, AutoModelForSequenceClassification

`,
          solutionCode: `from transformers import AutoTokenizer, AutoModelForSequenceClassification

name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)
print(model.config.num_labels)`,
          tests: [
            {
              id: 1,
              label: `Loads tokenizer with from_pretrained`,
              keywords: [{ pattern: `AutoTokenizer\\.from_pretrained\\s*\\(` }],
            },
            {
              id: 2,
              label: `Loads model with from_pretrained`,
              keywords: [{ pattern: `AutoModelForSequenceClassification\\.from_pretrained\\s*\\(` }],
            },
            {
              id: 3,
              label: `Prints num_labels`,
              keywords: [{ pattern: `print\\s*\\(\\s*model\\.config\\.num_labels\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "hf-4",
        title: `Under the hood: logits, softmax, labels`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `A model call returns raw **logits** — unnormalized scores, one per class. Apply **softmax** to turn them into probabilities that sum to 1, then use \`argmax\` and \`id2label\` to read the winning class.`,
          },
          {
            type: "scenario",
            title: `Debugging a pipeline result`,
            content:
              `A pipeline returns \`{"label": "POSITIVE", "score": 0.99}\` — this is exactly what you get by manually running the model, applying softmax, and looking up the class name.`,
          },
          {
            type: "diagram",
            title: `From text to label`,
            nodes: [
              {
                id: "tok",
                label: `Tokenizer`,
                color: "#FF9D00",
                items: [`input_ids`, `attention_mask`],
              },
              {
                id: "mod",
                label: `Model`,
                color: "#FFB84D",
                items: [`raw logits`],
              },
              {
                id: "post",
                label: `Post-process`,
                color: "#FFD180",
                items: [`softmax`, `argmax`, `id2label`],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Wrap inference in \`torch.no_grad()\` — you are not training, so skip gradient tracking to save memory.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Manual inference`,
            content: `import torch

inputs = tokenizer("I love this!", return_tensors="pt")
with torch.no_grad():
    outputs = model(**inputs)

probs = torch.softmax(outputs.logits, dim=-1)
label_id = probs.argmax().item()
print(model.config.id2label[label_id])`,
          },
          {
            type: "quiz",
            question: `What does softmax do to a model's logits?`,
            options: [
              `Deletes negative values`,
              `Converts them into probabilities that sum to 1`,
              `Sorts them alphabetically`,
              `Trains the model further`,
            ],
            answer: 1,
            explanation:
              `Softmax exponentiates and normalizes logits so they behave like a probability distribution over classes.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Manual Prediction`,
          description:
            `Tokenize \`"I love this!"\` with \`return_tensors="pt"\`, run the model, apply \`torch.softmax\`, get the \`argmax\`, and print the label via \`model.config.id2label\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

inputs = tokenizer("I love this!", return_tensors="pt")
with torch.no_grad():
    outputs = model(**inputs)

probs = torch.softmax(outputs.logits, dim=-1)
label_id = probs.argmax().item()
print(model.config.id2label[label_id])`,
          tests: [
            {
              id: 1,
              label: `Uses return_tensors="pt"`,
              keywords: [{ pattern: `return_tensors\\s*=\\s*["']pt["']` }],
            },
            {
              id: 2,
              label: `Applies softmax`,
              keywords: [{ pattern: `torch\\.softmax\\s*\\(` }],
            },
            {
              id: 3,
              label: `Uses id2label`,
              keywords: [{ pattern: `id2label` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "tokenizers",
    title: `Tokenizers`,
    icon: "✂️",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-5",
        title: `What tokenization does`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `Models cannot read raw text — they read numbers. **Tokenization** splits text into pieces (tokens) and maps each to an id. Modern tokenizers use **subwords**: common words stay whole, rare words split into smaller known pieces.`,
          },
          {
            type: "scenario",
            title: `Handling a word the model never saw`,
            content:
              `"unhappiness" might not be in the vocabulary as one piece, but a subword tokenizer can split it into known pieces like "un", "happi", "ness" — so the model still gets useful signal instead of one big "unknown" token.`,
          },
          {
            type: "table",
            title: `Tokenization strategies`,
            columns: [`Strategy`, `Splits on`, `Example models`],
            rows: [
              { label: `Word-level`, values: [`Word-level`, `Whitespace`, `Older, huge vocabularies`] },
              { label: `Character-level`, values: [`Character-level`, `Single characters`, `Very long sequences`] },
              { label: `Subword (WordPiece)`, values: [`Subword (WordPiece)`, `Frequent word pieces`, `BERT, DistilBERT`] },
              { label: `Subword (BPE)`, values: [`Subword (BPE)`, `Byte-pair merges`, `GPT-2, RoBERTa`] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Special tokens like \`[CLS]\` and \`[SEP]\` (BERT-style) mark the start of a sequence and separate segments — the model was trained expecting them.`,
          },
          {
            type: "code",
            lang: "python",
            label: `See the pieces`,
            content: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer.tokenize("Hugging Face is great!")
print(tokens)`,
          },
          {
            type: "quiz",
            question: `Why do modern tokenizers use subwords instead of whole words?`,
            options: [
              `Subwords are always shorter to type`,
              `They keep the vocabulary small while still handling rare or unseen words`,
              `Models cannot process whole words at all`,
              `Subwords remove the need for a vocabulary`,
            ],
            answer: 1,
            explanation:
              `Subword tokenization balances vocabulary size against the ability to represent any word by combining known pieces.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Tokenize a Sentence`,
          description:
            `Load \`AutoTokenizer.from_pretrained("bert-base-uncased")\` and print \`tokenizer.tokenize("Hugging Face is great!")\`.`,
          starterCode: `from transformers import AutoTokenizer

`,
          solutionCode: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer.tokenize("Hugging Face is great!")
print(tokens)`,
          tests: [
            {
              id: 1,
              label: `Loads a tokenizer`,
              keywords: [{ pattern: `AutoTokenizer\\.from_pretrained\\s*\\(` }],
            },
            {
              id: 2,
              label: `Calls .tokenize()`,
              keywords: [{ pattern: `\\.tokenize\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-6",
        title: `Using AutoTokenizer (encode/decode)`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `Calling a tokenizer directly — \`tokenizer(text)\` — returns a dict with **\`input_ids\`** (token numbers) and **\`attention_mask\`** (which tokens are real). Use **\`.decode()\`** to turn ids back into text.`,
          },
          {
            type: "scenario",
            title: `Round-tripping a sentence`,
            content:
              `Encoding then decoding the same text should give you back (roughly) the original sentence, plus any special tokens the model expects — a good sanity check when debugging.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Encode and decode`,
            content: `encoded = tokenizer("Hugging Face is great!")
print(encoded["input_ids"])
print(tokenizer.decode(encoded["input_ids"]))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Use \`tokenizer.decode(ids, skip_special_tokens=True)\` when you want clean output without \`[CLS]\`/\`[SEP]\` markers.`,
          },
          {
            type: "quiz",
            question: `What does tokenizer.decode() do?`,
            options: [
              `Converts token ids back into readable text`,
              `Trains the tokenizer on new text`,
              `Deletes the tokenizer's vocabulary`,
              `Only works on images`,
            ],
            answer: 0,
            explanation:
              `decode() is the inverse of encoding — it maps ids back to a string.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Encode Then Decode`,
          description:
            `Encode \`"Hugging Face is great!"\`, print \`encoded["input_ids"]\`, then print \`tokenizer.decode(encoded["input_ids"])\`.`,
          starterCode: `

`,
          solutionCode: `encoded = tokenizer("Hugging Face is great!")
print(encoded["input_ids"])
print(tokenizer.decode(encoded["input_ids"]))`,
          tests: [
            {
              id: 1,
              label: `Prints input_ids`,
              keywords: [{ pattern: `print\\s*\\(\\s*encoded\\[["']input_ids["']\\]\\s*\\)` }],
            },
            {
              id: 2,
              label: `Decodes the ids`,
              keywords: [{ pattern: `tokenizer\\.decode\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-7",
        title: `Padding, truncation & batches`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `A model expects every sequence in a batch to be the **same length**. **\`padding=True\`** fills short sequences with a pad token; **\`truncation=True\`** cuts long ones. **\`attention_mask\`** tells the model which tokens are real vs. padding.`,
          },
          {
            type: "scenario",
            title: `Batching reviews of different lengths`,
            content:
              `"Great!" and a three-sentence review cannot sit in the same tensor unless one is padded — padding makes both rows the same width so they can be stacked.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Pad and truncate a batch`,
            content: `batch = tokenizer(
    ["Great!", "This movie was way too long and I fell asleep."],
    padding=True,
    truncation=True,
    return_tensors="pt",
)
print(batch["input_ids"].shape)
print(batch["attention_mask"])`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Without \`attention_mask\`, the model would treat padding tokens as real input and get confused — always pass the mask along to the model.`,
          },
          {
            type: "quiz",
            question: `What does the attention_mask mark?`,
            options: [
              `Which words are nouns`,
              `Which tokens are real content vs. padding`,
              `Which layer to use in the model`,
              `The learning rate`,
            ],
            answer: 1,
            explanation:
              `attention_mask is 1 for real tokens and 0 for padding, so the model can ignore the padding.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Pad a Batch`,
          description:
            `Tokenize \`["Great!", "This movie was way too long and I fell asleep."]\` with \`padding=True\`, \`truncation=True\`, \`return_tensors="pt"\`. Print \`batch["input_ids"].shape\`.`,
          starterCode: `

`,
          solutionCode: `batch = tokenizer(
    ["Great!", "This movie was way too long and I fell asleep."],
    padding=True,
    truncation=True,
    return_tensors="pt",
)
print(batch["input_ids"].shape)`,
          tests: [
            {
              id: 1,
              label: `Uses padding=True`,
              keywords: [{ pattern: `padding\\s*=\\s*True` }],
            },
            {
              id: 2,
              label: `Uses truncation=True`,
              keywords: [{ pattern: `truncation\\s*=\\s*True` }],
            },
            {
              id: 3,
              label: `Returns PyTorch tensors`,
              keywords: [{ pattern: `return_tensors\\s*=\\s*["']pt["']` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "datasets",
    title: `Datasets Library`,
    icon: "📚",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-8",
        title: `load_dataset() basics`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `The **\`datasets\`** library loads ready-made datasets from the Hub with one call: **\`load_dataset(name)\`**. The result is a \`DatasetDict\` with **splits** like \`train\`, \`validation\`, and \`test\`.`,
          },
          {
            type: "scenario",
            title: `Skipping the download-and-parse chore`,
            content:
              `Instead of downloading a CSV, writing a parser, and handling edge cases, \`load_dataset("imdb")\` gives you a ready-to-use, already-split movie review dataset in one line.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Load and preview`,
            content: `from datasets import load_dataset

dataset = load_dataset("imdb")
print(dataset)
print(dataset["train"][0])`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Datasets are cached locally after the first download, just like models — later calls are fast and work offline.`,
          },
          {
            type: "quiz",
            question: `What does load_dataset("imdb") return?`,
            options: [
              `A single Python list`,
              `A DatasetDict with splits like train/test`,
              `A trained model`,
              `A CSV file path only`,
            ],
            answer: 1,
            explanation:
              `Most Hub datasets ship with named splits, bundled together in a DatasetDict.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load IMDB`,
          description:
            `Import \`load_dataset\` from \`datasets\`, load \`"imdb"\`, and print \`dataset["train"][0]\`.`,
          starterCode: `from datasets import load_dataset

`,
          solutionCode: `from datasets import load_dataset

dataset = load_dataset("imdb")
print(dataset["train"][0])`,
          tests: [
            {
              id: 1,
              label: `Imports load_dataset`,
              keywords: [{ pattern: `from\\s+datasets\\s+import\\s+load_dataset` }],
            },
            {
              id: 2,
              label: `Loads imdb`,
              keywords: [{ pattern: `load_dataset\\s*\\(\\s*["']imdb["']\\s*\\)` }],
            },
            {
              id: 3,
              label: `Prints a train example`,
              keywords: [{ pattern: `dataset\\[["']train["']\\]\\[0\\]` }],
            },
          ],
        },
      },
      {
        id: "hf-9",
        title: `Inspecting & slicing a Dataset`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `A \`Dataset\` behaves like a smart list. Check **\`.features\`** to see column names and types, index it like a list, and use **\`.shuffle()\`** + **\`.select()\`** to grab a small random sample for quick experiments.`,
          },
          {
            type: "scenario",
            title: `Quick sanity check before a long training run`,
            content:
              `Before tokenizing 25,000 reviews, pull a shuffled sample of 5 to eyeball the text and labels — catching a formatting problem early saves a lot of wasted compute.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Inspect and sample`,
            content: `print(dataset["train"].features)

small = dataset["train"].shuffle(seed=42).select(range(5))
print(small["label"])`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Set a fixed \`seed\` when shuffling so your sample is reproducible between runs.`,
          },
          {
            type: "quiz",
            question: `What does dataset["train"].features tell you?`,
            options: [
              `The trained model's accuracy`,
              `The column names and their data types`,
              `The number of GPUs available`,
              `The tokenizer's vocabulary`,
            ],
            answer: 1,
            explanation:
              `.features describes the schema — column names, types (like ClassLabel), and possible label names.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Sample the Dataset`,
          description:
            `Print \`dataset["train"].features\`. Then create \`small = dataset["train"].shuffle(seed=42).select(range(5))\` and print \`small["label"]\`.`,
          starterCode: `

`,
          solutionCode: `print(dataset["train"].features)

small = dataset["train"].shuffle(seed=42).select(range(5))
print(small["label"])`,
          tests: [
            {
              id: 1,
              label: `Shuffles with a seed`,
              keywords: [{ pattern: `\\.shuffle\\s*\\(\\s*seed\\s*=` }],
            },
            {
              id: 2,
              label: `Selects a range`,
              keywords: [{ pattern: `\\.select\\s*\\(\\s*range\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-10",
        title: `map(), filter(), and preprocessing`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `**\`.map(fn, batched=True)\`** runs a function over the whole dataset — perfect for tokenizing every row in one pass. **\`.filter(fn)\`** keeps only rows where \`fn\` returns \`True\`.`,
          },
          {
            type: "scenario",
            title: `Tokenizing 25,000 reviews at once`,
            content:
              `Writing a manual loop over every review is slow and easy to get wrong. \`.map()\` applies your tokenizer function in batches and can use multiple processes automatically.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Tokenize and filter`,
            content: `def tokenize_fn(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

tokenized = dataset.map(tokenize_fn, batched=True)
short_only = tokenized.filter(lambda ex: len(ex["input_ids"]) < 256)
print(short_only)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Use \`remove_columns=[...]\` on \`.map()\` to drop raw text columns the model does not need — keeping only tensors speeds up training.`,
          },
          {
            type: "quiz",
            question: `What does batched=True do in .map()?`,
            options: [
              `Processes the dataset one row at a time`,
              `Passes chunks of rows to your function at once, for speed`,
              `Deletes the dataset`,
              `Trains the model`,
            ],
            answer: 1,
            explanation:
              `batched=True hands your function a dict of lists (a batch) instead of one example, which is much faster for tokenization.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Tokenize the Whole Dataset`,
          description:
            `Define \`tokenize_fn(batch)\` that returns \`tokenizer(batch["text"], padding=True, truncation=True)\`. Apply it with \`dataset.map(tokenize_fn, batched=True)\`.`,
          starterCode: `

`,
          solutionCode: `def tokenize_fn(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

tokenized = dataset.map(tokenize_fn, batched=True)
print(tokenized)`,
          tests: [
            {
              id: 1,
              label: `Defines tokenize_fn`,
              keywords: [{ pattern: `def\\s+tokenize_fn\\s*\\(` }],
            },
            {
              id: 2,
              label: `Calls .map with batched=True`,
              keywords: [{ pattern: `\\.map\\s*\\(\\s*tokenize_fn\\s*,\\s*batched\\s*=\\s*True\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "hub",
    title: `Model Hub`,
    icon: "🌐",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-11",
        title: `Finding models & model cards`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `The **Hub** (huggingface.co/models) lets you filter by task, library, and language. Every model has a **model card** — documentation covering intended use, limitations, training data, and license.`,
          },
          {
            type: "scenario",
            title: `Choosing the right checkpoint`,
            content:
              `Two models both do sentiment analysis — one is tiny and fast, one is large and more accurate. The model card's "intended use" and benchmark numbers help you pick the right tradeoff for your app.`,
          },
          {
            type: "table",
            title: `What a model card tells you`,
            columns: [`Section`, `Why it matters`],
            rows: [
              { label: `Intended use`, values: [`Intended use`, `Is this model meant for your task?`] },
              { label: `Limitations`, values: [`Limitations`, `Known biases or failure cases`] },
              { label: `Training data`, values: [`Training data`, `What the model has and has not seen`] },
              { label: `License`, values: [`License`, `Whether you can use it commercially`] },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Always check the license section before shipping a model in a commercial product — not every model allows commercial use.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Search the Hub from code`,
            content: `from huggingface_hub import HfApi

api = HfApi()
models = api.list_models(task="text-classification", limit=5)
for m in models:
    print(m.id)`,
          },
          {
            type: "quiz",
            question: `Why check a model's license before using it?`,
            options: [
              `Licenses affect model accuracy`,
              `Some licenses restrict commercial or redistribution use`,
              `It changes the model's file size`,
              `It is required to load the model at all`,
            ],
            answer: 1,
            explanation:
              `A model file can load regardless of license — but using it against the license terms is a legal risk, so always check first.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `List Text Classification Models`,
          description:
            `Import \`HfApi\` from \`huggingface_hub\`. Create \`api = HfApi()\`, list models with \`task="text-classification"\` and \`limit=5\`, and print each model's \`.id\`.`,
          starterCode: `from huggingface_hub import HfApi

`,
          solutionCode: `from huggingface_hub import HfApi

api = HfApi()
models = api.list_models(task="text-classification", limit=5)
for m in models:
    print(m.id)`,
          tests: [
            {
              id: 1,
              label: `Creates HfApi`,
              keywords: [{ pattern: `HfApi\\s*\\(` }],
            },
            {
              id: 2,
              label: `Calls list_models`,
              keywords: [{ pattern: `\\.list_models\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-12",
        title: `from_pretrained() and caching`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `**Any** public repo id works with \`from_pretrained()\` — not just official models. Downloaded files are cached under \`~/.cache/huggingface\`. Pass **\`revision=\`** to pin an exact commit, tag, or branch for reproducibility.`,
          },
          {
            type: "scenario",
            title: `Reproducible experiments`,
            content:
              `A model's weights on the Hub can change over time. Pinning \`revision="v1.0"\` guarantees your experiment loads exactly the same weights months later.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Pin a revision`,
            content: `from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased-finetuned-sst-2-english",
    revision="main",
)
print(model.name_or_path)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Set the \`HF_HOME\` environment variable to change where models are cached — handy on machines with limited home-directory space.`,
          },
          {
            type: "quiz",
            question: `What does the revision argument control?`,
            options: [
              `The programming language used`,
              `Which exact commit, branch, or tag of a repo gets loaded`,
              `The batch size during inference`,
              `Whether the model trains further`,
            ],
            answer: 1,
            explanation:
              `revision pins from_pretrained() to a specific point in the repo's history, just like a git ref.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load a Pinned Revision`,
          description:
            `Load \`AutoModelForSequenceClassification\` from \`"distilbert-base-uncased-finetuned-sst-2-english"\` with \`revision="main"\`, then print \`model.name_or_path\`.`,
          starterCode: `from transformers import AutoModelForSequenceClassification

`,
          solutionCode: `from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased-finetuned-sst-2-english",
    revision="main",
)
print(model.name_or_path)`,
          tests: [
            {
              id: 1,
              label: `Passes a revision`,
              keywords: [{ pattern: `revision\\s*=\\s*["']main["']` }],
            },
            {
              id: 2,
              label: `Prints name_or_path`,
              keywords: [{ pattern: `print\\s*\\(\\s*model\\.name_or_path\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "hf-13",
        title: `push_to_hub() & login`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `Log in once with **\`huggingface_hub.login(token=...)\`**, then call **\`model.push_to_hub(repo_id)\`** and **\`tokenizer.push_to_hub(repo_id)\`** to publish your own model — anyone can load it back with \`from_pretrained()\`.`,
          },
          {
            type: "scenario",
            title: `Sharing a fine-tuned model with your team`,
            content:
              `You fine-tuned a classifier locally. Instead of emailing a zip file, \`push_to_hub("your-org/ticket-classifier")\` gives teammates a \`from_pretrained()\`-ready repo in seconds.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Publish a model`,
            content: `from huggingface_hub import login

login(token="hf_your_token_here")

model.push_to_hub("your-username/my-sentiment-model")
tokenizer.push_to_hub("your-username/my-sentiment-model")`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Never hardcode a real token in shared code. Use an environment variable or \`huggingface-cli login\` from a terminal instead.`,
          },
          {
            type: "quiz",
            question: `What does push_to_hub() upload?`,
            options: [
              `Only the training data`,
              `Model weights and config (and tokenizer files, when called on the tokenizer)`,
              `Your entire local filesystem`,
              `Nothing until you also call save_pretrained()`,
            ],
            answer: 1,
            explanation:
              `push_to_hub() uploads the weights/config for a model, or the vocab/config files for a tokenizer, to a Hub repo.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Publish to the Hub`,
          description:
            `Import \`login\` from \`huggingface_hub\`, log in with a token, then call \`push_to_hub\` on both \`model\` and \`tokenizer\` for \`"your-username/my-sentiment-model"\`.`,
          starterCode: `from huggingface_hub import login

`,
          solutionCode: `from huggingface_hub import login

login(token="hf_your_token_here")

model.push_to_hub("your-username/my-sentiment-model")
tokenizer.push_to_hub("your-username/my-sentiment-model")`,
          tests: [
            {
              id: 1,
              label: `Logs in`,
              keywords: [{ pattern: `login\\s*\\(\\s*token\\s*=` }],
            },
            {
              id: 2,
              label: `Pushes the model`,
              keywords: [{ pattern: `model\\.push_to_hub\\s*\\(` }],
            },
            {
              id: 3,
              label: `Pushes the tokenizer`,
              keywords: [{ pattern: `tokenizer\\.push_to_hub\\s*\\(` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "finetuning",
    title: `Fine-tuning Pretrained Models`,
    icon: "🏋️",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-14",
        title: `TrainingArguments & Trainer`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `**\`TrainingArguments\`** configures a training run — output folder, epochs, batch size, learning rate. **\`Trainer\`** wires together the model, arguments, and datasets, and handles the training loop for you.`,
          },
          {
            type: "scenario",
            title: `Skipping the manual training loop`,
            content:
              `Instead of writing forward/backward/step by hand like in raw PyTorch, \`Trainer\` gives you logging, checkpointing, and evaluation out of the box.`,
          },
          {
            type: "diagram",
            title: `Trainer setup`,
            nodes: [
              {
                id: "args",
                label: `TrainingArguments`,
                color: "#FF9D00",
                items: [`epochs, batch size, lr`],
              },
              {
                id: "trainer",
                label: `Trainer`,
                color: "#FFB84D",
                items: [`model + args + data`],
              },
              {
                id: "run",
                label: `.train()`,
                color: "#FFD180",
                items: [`Logs loss`, `Saves checkpoints`],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Start with a small \`num_train_epochs\` (1–3) and a small dataset slice while you debug your setup — full runs can take hours.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Minimal Trainer setup`,
            content: `from transformers import TrainingArguments, Trainer

args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8,
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
)
trainer.train()`,
          },
          {
            type: "quiz",
            question: `What does TrainingArguments control?`,
            options: [
              `The dataset's column names`,
              `Training hyperparameters like epochs, batch size, and output folder`,
              `The model's vocabulary`,
              `Which GPU brand is installed`,
            ],
            answer: 1,
            explanation:
              `TrainingArguments is a config object for the training run — hyperparameters and logging/saving behavior.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Set Up a Trainer`,
          description:
            `Create \`TrainingArguments(output_dir="./results", num_train_epochs=3, per_device_train_batch_size=8)\`, wire up a \`Trainer\` with \`model\`, \`args\`, and \`train_dataset=tokenized["train"]\`, then call \`trainer.train()\`.`,
          starterCode: `from transformers import TrainingArguments, Trainer

`,
          solutionCode: `from transformers import TrainingArguments, Trainer

args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8,
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
)
trainer.train()`,
          tests: [
            {
              id: 1,
              label: `Creates TrainingArguments`,
              keywords: [{ pattern: `TrainingArguments\\s*\\(` }],
            },
            {
              id: 2,
              label: `Creates a Trainer`,
              keywords: [{ pattern: `Trainer\\s*\\(` }],
            },
            {
              id: 3,
              label: `Calls trainer.train()`,
              keywords: [{ pattern: `trainer\\.train\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-15",
        title: `Metrics with evaluate`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `The **\`evaluate\`** library loads standard metrics with **\`evaluate.load(name)\`**. Write a **\`compute_metrics\`** function and pass it to \`Trainer\` so accuracy/F1 get logged automatically during evaluation.`,
          },
          {
            type: "scenario",
            title: `Knowing if fine-tuning actually helped`,
            content:
              `Loss going down is not the whole story — a \`compute_metrics\` function reporting accuracy on a held-out validation set tells you whether the model is actually getting better at the task.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Accuracy metric`,
            content: `import evaluate
import numpy as np

metric = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return metric.compute(predictions=preds, references=labels)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Pass \`compute_metrics=compute_metrics\` to \`Trainer\` and give it an \`eval_dataset\` — results are printed after each evaluation step.`,
          },
          {
            type: "quiz",
            question: `What does compute_metrics receive as input?`,
            options: [
              `The raw text of every example`,
              `A tuple of (logits, labels) from evaluation`,
              `The model's file path`,
              `Nothing — it takes no arguments`,
            ],
            answer: 1,
            explanation:
              `Trainer calls compute_metrics with an EvalPrediction containing predictions (logits) and label_ids.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Compute Accuracy`,
          description:
            `Load \`evaluate.load("accuracy")\` as \`metric\`. Define \`compute_metrics(eval_pred)\` that unpacks logits and labels, takes \`np.argmax\`, and returns \`metric.compute(predictions=preds, references=labels)\`.`,
          starterCode: `import evaluate
import numpy as np

`,
          solutionCode: `import evaluate
import numpy as np

metric = evaluate.load("accuracy")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return metric.compute(predictions=preds, references=labels)`,
          tests: [
            {
              id: 1,
              label: `Loads an evaluate metric`,
              keywords: [{ pattern: `evaluate\\.load\\s*\\(` }],
            },
            {
              id: 2,
              label: `Defines compute_metrics`,
              keywords: [{ pattern: `def\\s+compute_metrics\\s*\\(` }],
            },
            {
              id: 3,
              label: `Uses argmax on logits`,
              keywords: [{ pattern: `np\\.argmax\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-16",
        title: `Fine-tuning a text classifier end-to-end`,
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              `Fine-tuning combines everything so far: a **tokenized dataset**, a **model**, **\`TrainingArguments\`**, and a **\`Trainer\`** with **\`compute_metrics\`**. Call \`.train()\`, then \`.save_pretrained()\` to keep the result.`,
          },
          {
            type: "scenario",
            title: `Specializing a general model`,
            content:
              `A general sentiment model might not know your app's slang. Fine-tuning on a few thousand labeled examples from your own domain nudges the pretrained weights toward your specific data.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Full fine-tuning run`,
            content: `trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["test"],
    compute_metrics=compute_metrics,
)
trainer.train()
model.save_pretrained("./fine-tuned-model")
tokenizer.save_pretrained("./fine-tuned-model")`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `Reload later with \`AutoModelForSequenceClassification.from_pretrained("./fine-tuned-model")\` — it works exactly like a Hub model.`,
          },
          {
            type: "quiz",
            question: `After trainer.train() finishes, how do you keep the fine-tuned weights?`,
            options: [
              `They save automatically to the Hub`,
              `Call model.save_pretrained(path)`,
              `Restart the Python process`,
              `Weights cannot be saved locally`,
            ],
            answer: 1,
            explanation:
              `save_pretrained() writes the model config and weights to a local folder you choose.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Train, Evaluate, Save`,
          description:
            `Build a \`Trainer\` with \`train_dataset\`, \`eval_dataset\`, and \`compute_metrics\`. Call \`trainer.train()\`, then \`model.save_pretrained("./fine-tuned-model")\`.`,
          starterCode: `

`,
          solutionCode: `trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["test"],
    compute_metrics=compute_metrics,
)
trainer.train()
model.save_pretrained("./fine-tuned-model")
tokenizer.save_pretrained("./fine-tuned-model")`,
          tests: [
            {
              id: 1,
              label: `Passes eval_dataset`,
              keywords: [{ pattern: `eval_dataset\\s*=` }],
            },
            {
              id: 2,
              label: `Passes compute_metrics`,
              keywords: [{ pattern: `compute_metrics\\s*=\\s*compute_metrics` }],
            },
            {
              id: 3,
              label: `Saves the model`,
              keywords: [{ pattern: `model\\.save_pretrained\\s*\\(` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "peft",
    title: `PEFT & LoRA`,
    icon: "🧬",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-17",
        title: `Why parameter-efficient fine-tuning?`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `Full fine-tuning updates **every** parameter in a model — for a model with hundreds of millions (or billions) of weights, that means huge memory use and storage per fine-tuned copy. **PEFT** (Parameter-Efficient Fine-Tuning) freezes the base model and trains only a small number of extra parameters.`,
          },
          {
            type: "scenario",
            title: `One base model, many tasks`,
            content:
              `A company fine-tunes the same base model for 10 different clients. Full fine-tuning means storing 10 full copies of the model. PEFT means storing 1 base model plus 10 tiny adapter files.`,
          },
          {
            type: "table",
            title: `Full fine-tuning vs. LoRA`,
            columns: [`Aspect`, `Full fine-tuning`, `LoRA (PEFT)`],
            rows: [
              { label: `Trainable params`, values: [`Trainable params`, `100%`, `Often < 1%`] },
              { label: `Memory to train`, values: [`Memory to train`, `High`, `Much lower`] },
              { label: `Saved file size`, values: [`Saved file size`, `Full model`, `A few MB adapter`] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              `LoRA is one PEFT method among several (others include prefix tuning and adapters) — it is the most widely used today because it is simple and effective.`,
          },
          {
            type: "code",
            lang: "python",
            label: `How big is "full"?`,
            content: `from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
total = sum(p.numel() for p in model.parameters())
print(f"{total:,} total parameters")`,
          },
          {
            type: "quiz",
            question: `What is the core idea behind PEFT methods like LoRA?`,
            options: [
              `Train a completely new model from scratch`,
              `Freeze the pretrained weights and train a small number of extra parameters`,
              `Delete most of the model's layers`,
              `Only change the tokenizer, never the model`,
            ],
            answer: 1,
            explanation:
              `PEFT keeps the base model frozen and adds small trainable pieces, cutting memory and storage costs sharply.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Count the Parameters`,
          description:
            `Load \`AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")\` and print the total parameter count using \`sum(p.numel() for p in model.parameters())\`.`,
          starterCode: `from transformers import AutoModelForSequenceClassification

`,
          solutionCode: `from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
total = sum(p.numel() for p in model.parameters())
print(total)`,
          tests: [
            {
              id: 1,
              label: `Sums parameter counts`,
              keywords: [{ pattern: `\\.numel\\s*\\(\\s*\\)` }],
            },
            {
              id: 2,
              label: `Prints the total`,
              keywords: [{ pattern: `print\\s*\\(\\s*total\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "hf-18",
        title: `LoraConfig and get_peft_model`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `The **\`peft\`** library adds LoRA support. **\`LoraConfig\`** sets the adapter's **rank (\`r\`)**, scaling (**\`lora_alpha\`**), and which layers to target. **\`get_peft_model()\`** wraps your base model with trainable LoRA adapters.`,
          },
          {
            type: "scenario",
            title: `Picking a rank`,
            content:
              `A low rank (\`r=4\` or \`r=8\`) trains very few extra parameters and is fast to experiment with; a higher rank gives the adapter more capacity at the cost of a few more trainable parameters.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Wrap a model with LoRA`,
            content: `from peft import LoraConfig, get_peft_model, TaskType

config = LoraConfig(
    task_type=TaskType.SEQ_CLS,
    r=8,
    lora_alpha=16,
    lora_dropout=0.1,
    target_modules=["q_lin", "v_lin"],
)

peft_model = get_peft_model(model, config)
peft_model.print_trainable_parameters()`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `\`print_trainable_parameters()\` usually shows well under 1% of parameters as trainable — that is the whole point of LoRA.`,
          },
          {
            type: "quiz",
            question: `What does target_modules specify in LoraConfig?`,
            options: [
              `Which dataset columns to use`,
              `Which layers of the base model get LoRA adapters attached`,
              `The learning rate schedule`,
              `The tokenizer's vocabulary size`,
            ],
            answer: 1,
            explanation:
              `target_modules names the linear layers (like attention query/value projections) that receive LoRA's low-rank update.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Build a LoRA Adapter`,
          description:
            `Create a \`LoraConfig\` with \`task_type=TaskType.SEQ_CLS\`, \`r=8\`, \`lora_alpha=16\`. Wrap \`model\` with \`get_peft_model()\` and call \`print_trainable_parameters()\`.`,
          starterCode: `from peft import LoraConfig, get_peft_model, TaskType

`,
          solutionCode: `from peft import LoraConfig, get_peft_model, TaskType

config = LoraConfig(
    task_type=TaskType.SEQ_CLS,
    r=8,
    lora_alpha=16,
    lora_dropout=0.1,
    target_modules=["q_lin", "v_lin"],
)

peft_model = get_peft_model(model, config)
peft_model.print_trainable_parameters()`,
          tests: [
            {
              id: 1,
              label: `Creates a LoraConfig`,
              keywords: [{ pattern: `LoraConfig\\s*\\(` }],
            },
            {
              id: 2,
              label: `Wraps the model with get_peft_model`,
              keywords: [{ pattern: `get_peft_model\\s*\\(\\s*model` }],
            },
            {
              id: 3,
              label: `Prints trainable parameters`,
              keywords: [{ pattern: `print_trainable_parameters\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-19",
        title: `Training and saving a LoRA adapter`,
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              `A LoRA-wrapped model trains with the **same \`Trainer\` workflow** as any other model. **\`save_pretrained()\`** on a PEFT model saves only the small adapter weights. Reload with **\`PeftModel.from_pretrained(base_model, adapter_path)\`**.`,
          },
          {
            type: "scenario",
            title: `Shipping a few-MB adapter instead of a full model`,
            content:
              `A fine-tuned adapter for a 250M-parameter base model might be only a few megabytes — small enough to email, version in git, or bundle several per app.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Train, save, and reload`,
            content: `trainer = Trainer(model=peft_model, args=args, train_dataset=tokenized["train"])
trainer.train()
peft_model.save_pretrained("./lora-adapter")

from peft import PeftModel

base = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
loaded = PeftModel.from_pretrained(base, "./lora-adapter")`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `Because the base model is frozen, you can swap different adapters onto the same base model at inference time without reloading everything.`,
          },
          {
            type: "quiz",
            question: `What does peft_model.save_pretrained() write to disk?`,
            options: [
              `The entire base model's weights`,
              `Only the small LoRA adapter weights`,
              `Nothing — PEFT models cannot be saved`,
              `The training dataset`,
            ],
            answer: 1,
            explanation:
              `Since the base weights are frozen and unchanged, only the trained adapter parameters need to be saved.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Save and Reload an Adapter`,
          description:
            `Train \`peft_model\` with a \`Trainer\`, save it with \`peft_model.save_pretrained("./lora-adapter")\`, then reload with \`PeftModel.from_pretrained(base, "./lora-adapter")\`.`,
          starterCode: `from peft import PeftModel

`,
          solutionCode: `trainer = Trainer(model=peft_model, args=args, train_dataset=tokenized["train"])
trainer.train()
peft_model.save_pretrained("./lora-adapter")

from peft import PeftModel

base = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased")
loaded = PeftModel.from_pretrained(base, "./lora-adapter")`,
          tests: [
            {
              id: 1,
              label: `Saves the adapter`,
              keywords: [{ pattern: `peft_model\\.save_pretrained\\s*\\(` }],
            },
            {
              id: 2,
              label: `Reloads with PeftModel`,
              keywords: [{ pattern: `PeftModel\\.from_pretrained\\s*\\(` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "quantization",
    title: `Quantization`,
    icon: "🗜️",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-20",
        title: `Why quantize?`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `**Quantization** stores model weights in fewer bits — trading some numeric precision for a much smaller memory footprint and faster inference. Common formats: **float32** (default), **float16/bfloat16**, **int8**, and **int4**.`,
          },
          {
            type: "scenario",
            title: `Fitting a big model on one GPU`,
            content:
              `A model that needs 28 GB in float32 might fit in about 7 GB at int8 — the difference between "does not fit" and "fits comfortably" on a single consumer GPU.`,
          },
          {
            type: "table",
            title: `Precision vs. rough memory per parameter`,
            columns: [`Format`, `Bytes / param`, `~Size for 7B params`],
            rows: [
              { label: `float32`, values: [`float32`, `4`, `~28 GB`] },
              { label: `float16 / bfloat16`, values: [`float16 / bfloat16`, `2`, `~14 GB`] },
              { label: `int8`, values: [`int8`, `1`, `~7 GB`] },
              { label: `int4`, values: [`int4`, `0.5`, `~3.5 GB`] },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Lower precision can slightly reduce accuracy — always evaluate a quantized model on your task before shipping it.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Halve memory with float16`,
            content: `import torch

model = model.half()
print(next(model.parameters()).dtype)`,
          },
          {
            type: "quiz",
            question: `What is the main tradeoff quantization makes?`,
            options: [
              `Training speed for dataset size`,
              `Numeric precision for lower memory use and faster inference`,
              `Accuracy for a larger vocabulary`,
              `License terms for open weights`,
            ],
            answer: 1,
            explanation:
              `Quantization reduces the number of bits per weight, shrinking memory and often speeding up inference, at some risk to accuracy.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Cast to Half Precision`,
          description:
            `Call \`model = model.half()\` and print \`next(model.parameters()).dtype\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

model = model.half()
print(next(model.parameters()).dtype)`,
          tests: [
            {
              id: 1,
              label: `Casts model to half precision`,
              keywords: [{ pattern: `model\\.half\\s*\\(\\s*\\)` }],
            },
            {
              id: 2,
              label: `Prints the resulting dtype`,
              keywords: [{ pattern: `print\\s*\\(\\s*next\\s*\\(\\s*model\\.parameters\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-21",
        title: `8-bit & 4-bit loading with bitsandbytes`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `With the **\`bitsandbytes\`** library installed, pass **\`load_in_8bit=True\`** or **\`load_in_4bit=True\`** to \`from_pretrained()\` to load a model already quantized — no separate conversion step. Requires a CUDA GPU.`,
          },
          {
            type: "scenario",
            title: `Running a large model on a single GPU`,
            content:
              `A model too big to fit in float16 on your GPU might load comfortably in 8-bit or 4-bit — enabling experimentation on hardware you already have.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Load in 8-bit`,
            content: `from transformers import AutoModelForCausalLM

model_8bit = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    load_in_8bit=True,
    device_map="auto",
)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `\`device_map="auto"\` lets the library decide how to split the model across available GPUs (and CPU/disk if needed).`,
          },
          {
            type: "quiz",
            question: `What is required to use load_in_8bit=True?`,
            options: [
              `Nothing extra — it works on any CPU`,
              `The bitsandbytes library and a CUDA GPU`,
              `A paid Hugging Face subscription`,
              `Converting the dataset to 8-bit first`,
            ],
            answer: 1,
            explanation:
              `8-bit and 4-bit loading rely on CUDA kernels from bitsandbytes, so they need an NVIDIA GPU.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Load GPT-2 in 8-bit`,
          description:
            `Load \`AutoModelForCausalLM.from_pretrained("gpt2", load_in_8bit=True, device_map="auto")\`.`,
          starterCode: `from transformers import AutoModelForCausalLM

`,
          solutionCode: `from transformers import AutoModelForCausalLM

model_8bit = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    load_in_8bit=True,
    device_map="auto",
)`,
          tests: [
            {
              id: 1,
              label: `Uses load_in_8bit=True`,
              keywords: [{ pattern: `load_in_8bit\\s*=\\s*True` }],
            },
            {
              id: 2,
              label: `Sets device_map="auto"`,
              keywords: [{ pattern: `device_map\\s*=\\s*["']auto["']` }],
            },
          ],
        },
      },
      {
        id: "hf-22",
        title: `BitsAndBytesConfig & QLoRA`,
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              `**\`BitsAndBytesConfig\`** gives fine control over 4-bit loading — quant type (**\`nf4\`**), compute dtype, and double quantization. Combining 4-bit loading with a **LoRA adapter** is the popular **QLoRA** technique: fine-tune huge models on modest GPUs.`,
          },
          {
            type: "scenario",
            title: `Fine-tuning a 7B model on a single consumer GPU`,
            content:
              `QLoRA made headlines by fine-tuning models that previously needed multiple data-center GPUs on a single 24 GB card — the base model stays 4-bit and frozen; only a small LoRA adapter trains in higher precision.`,
          },
          {
            type: "code",
            lang: "python",
            label: `4-bit NF4 config`,
            content: `from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

model = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    quantization_config=bnb_config,
    device_map="auto",
)`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `After loading with \`BitsAndBytesConfig\`, wrap the model with \`get_peft_model()\` from [[peft]] exactly as before — that combination is QLoRA.`,
          },
          {
            type: "quiz",
            question: `What is the core idea of QLoRA?`,
            options: [
              `Train the entire model in 4-bit precision`,
              `Keep a 4-bit frozen base model and train a small LoRA adapter on top`,
              `Only quantize the tokenizer, not the model`,
              `Replace the Trainer with a custom loop`,
            ],
            answer: 1,
            explanation:
              `QLoRA loads the base model in 4-bit (frozen) and trains a LoRA adapter in higher precision, combining both memory savings and effective fine-tuning.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Configure 4-bit NF4 Loading`,
          description:
            `Create a \`BitsAndBytesConfig\` with \`load_in_4bit=True\`, \`bnb_4bit_quant_type="nf4"\`, and \`bnb_4bit_compute_dtype=torch.bfloat16\`. Load \`"gpt2"\` with \`quantization_config=bnb_config\`.`,
          starterCode: `from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

`,
          solutionCode: `from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

model = AutoModelForCausalLM.from_pretrained(
    "gpt2",
    quantization_config=bnb_config,
    device_map="auto",
)`,
          tests: [
            {
              id: 1,
              label: `Creates BitsAndBytesConfig`,
              keywords: [{ pattern: `BitsAndBytesConfig\\s*\\(` }],
            },
            {
              id: 2,
              label: `Uses nf4 quant type`,
              keywords: [{ pattern: `bnb_4bit_quant_type\\s*=\\s*["']nf4["']` }],
            },
            {
              id: 3,
              label: `Passes quantization_config`,
              keywords: [{ pattern: `quantization_config\\s*=\\s*bnb_config` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "capstone",
    title: `Capstone`,
    icon: "🏆",
    color: "#FF9D00",
    lessons: [
      {
        id: "hf-23",
        title: `Mini project — sentiment pipeline + fine-tune + push`,
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              `Bring it together: load a small dataset, tokenize it, fine-tune a classifier with \`Trainer\`, then publish it. This is the same recipe used for real production fine-tunes — just on a smaller scale.`,
          },
          {
            type: "scenario",
            title: `From idea to a shared model`,
            content:
              `A team wants a lightweight classifier tuned to their own support tickets. This lesson's flow — dataset, tokenizer, Trainer, push_to_hub — is exactly how that ships.`,
          },
          {
            type: "code",
            lang: "python",
            label: `End-to-end sketch`,
            content: `from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
)

dataset = load_dataset("imdb")
small_train = dataset["train"].shuffle(seed=42).select(range(200))
small_test = dataset["test"].shuffle(seed=42).select(range(50))

name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name, num_labels=2)

def tokenize_fn(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

train_tok = small_train.map(tokenize_fn, batched=True)
test_tok = small_test.map(tokenize_fn, batched=True)

args = TrainingArguments(output_dir="./mini-run", num_train_epochs=1, per_device_train_batch_size=8)
trainer = Trainer(model=model, args=args, train_dataset=train_tok, eval_dataset=test_tok)
trainer.train()

model.push_to_hub("your-username/mini-imdb-classifier")
tokenizer.push_to_hub("your-username/mini-imdb-classifier")`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `You just ran the full Hugging Face recipe: dataset → tokenizer → model → Trainer → Hub.`,
          },
          {
            type: "quiz",
            question: `Which step comes right before push_to_hub() in this recipe?`,
            options: [
              `load_dataset()`,
              `trainer.train()`,
              `AutoTokenizer.from_pretrained()`,
              `tokenizer.tokenize()`,
            ],
            answer: 1,
            explanation:
              `You train first so there is a fine-tuned model worth publishing, then push it to the Hub.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `End-to-End Mini Classifier`,
          description:
            `Load a small IMDB sample, tokenize it, fine-tune with \`Trainer\` for 1 epoch, then \`push_to_hub("your-username/mini-imdb-classifier")\`.`,
          starterCode: `from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
)

`,
          solutionCode: `from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
)

dataset = load_dataset("imdb")
small_train = dataset["train"].shuffle(seed=42).select(range(200))

name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name, num_labels=2)

def tokenize_fn(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

train_tok = small_train.map(tokenize_fn, batched=True)

args = TrainingArguments(output_dir="./mini-run", num_train_epochs=1, per_device_train_batch_size=8)
trainer = Trainer(model=model, args=args, train_dataset=train_tok)
trainer.train()

model.push_to_hub("your-username/mini-imdb-classifier")
tokenizer.push_to_hub("your-username/mini-imdb-classifier")`,
          tests: [
            {
              id: 1,
              label: `Loads a dataset`,
              keywords: [{ pattern: `load_dataset\\s*\\(` }],
            },
            {
              id: 2,
              label: `Trains the model`,
              keywords: [{ pattern: `trainer\\.train\\s*\\(` }],
            },
            {
              id: 3,
              label: `Pushes the model to the Hub`,
              keywords: [{ pattern: `model\\.push_to_hub\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "hf-24",
        title: `Review & cheat sheet`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `You made it! Core Hugging Face flow: **pipeline → tokenizer → model → dataset → Trainer → Hub → PEFT/quantization for scale**. Keep this cheat sheet handy when starting new projects.`,
          },
          {
            type: "table",
            title: `Hugging Face cheat sheet`,
            columns: [`Task`, `Snippet`],
            rows: [
              { label: `Quick inference`, values: [`Quick inference`, `pipeline("sentiment-analysis")("text")`] },
              { label: `Load model + tokenizer`, values: [`Load model + tokenizer`, `AutoModel...from_pretrained(name)`] },
              { label: `Load dataset`, values: [`Load dataset`, `load_dataset("name")`] },
              { label: `Train`, values: [`Train`, `Trainer(model, args, train_dataset).train()`] },
              { label: `Publish`, values: [`Publish`, `model.push_to_hub("user/repo")`] },
              { label: `Lightweight fine-tune`, values: [`Lightweight fine-tune`, `get_peft_model(model, LoraConfig(...))`] },
            ],
          },
          {
            type: "diagram",
            title: `Your learning path`,
            nodes: [
              {
                id: "core",
                label: `Core library`,
                color: "#FF9D00",
                items: [`pipeline, Auto*, tokenizers`],
              },
              {
                id: "data",
                label: `Data & Hub`,
                color: "#FFB84D",
                items: [`datasets, Hub, model cards`],
              },
              {
                id: "train",
                label: `Train & scale`,
                color: "#FFD180",
                items: [`Trainer, PEFT/LoRA, quantization`],
              },
            ],
          },
          {
            type: "callout",
            variant: "success",
            content:
              `Next steps: try a different task (translation, NER), explore Spaces to demo your model, and read a few model cards for models you use often.`,
          },
          {
            type: "quiz",
            question: `Which combination lets you fine-tune a large model on a single modest GPU?`,
            options: [
              `Full fine-tuning in float32`,
              `4-bit quantized base model + a LoRA adapter (QLoRA)`,
              `Only using pipeline() for inference`,
              `Loading the dataset with padding=False`,
            ],
            answer: 1,
            explanation:
              `QLoRA — a frozen 4-bit base model plus a small trainable LoRA adapter — is the pattern that makes this practical.`,
          },
        ],
        challenge: {
          gradeMode: "keywords",
          title: `Cheat Sheet Print`,
          description:
            `Import \`pipeline\` from \`transformers\`, create a \`"sentiment-analysis"\` pipeline, and print its result on \`"Hugging Face is awesome!"\`.`,
          starterCode: `from transformers import pipeline

`,
          solutionCode: `from transformers import pipeline

classifier = pipeline("sentiment-analysis")
print(classifier("Hugging Face is awesome!"))`,
          tests: [
            {
              id: 1,
              label: `Imports pipeline`,
              keywords: [{ pattern: `from\\s+transformers\\s+import\\s+pipeline` }],
            },
            {
              id: 2,
              label: `Creates a pipeline`,
              keywords: [{ pattern: `pipeline\\s*\\(\\s*["']sentiment-analysis["']` }],
            },
            {
              id: 3,
              label: `Prints a result`,
              keywords: [{ pattern: `print\\s*\\(\\s*classifier\\s*\\(` }],
            },
          ],
        },
      },
    ],
  },
];

export const HUGGINGFACE_LESSONS = applyLessonVideoLinks(
  HUGGINGFACE_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      outcomes: l.outcomes ?? HUGGINGFACE_LESSON_OUTCOMES[l.id] ?? [],
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  HUGGINGFACE_VIDEO_LINKS,
);

export const HUGGINGFACE_TOTAL_XP = HUGGINGFACE_LESSONS.reduce((s, l) => s + l.xp, 0);
