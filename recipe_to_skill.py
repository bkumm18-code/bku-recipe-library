#!/usr/bin/env python3
"""Convert a recipe Markdown file into a portable Claude-style SKILL.md."""
from pathlib import Path
import argparse
import re

def skill_name(title: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return value or "recipe-skill"

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("recipe", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    text = args.recipe.read_text(encoding="utf-8")
    title_match = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else args.recipe.stem
    name = skill_name(title)
    frontmatter = f"---\nname: {name}\ndescription: Use the {title} recipe when the user asks for this workflow.\n---\n\n"
    body = (frontmatter + text + "\n\n## Skill operating rules\n\n"
            "Follow the recipe's completion criteria and pre-send checklist. "
            "Do not invent missing business rules; ask the owner when required information is absent.\n")
    output = args.output or Path("skills") / name / "SKILL.md"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(body, encoding="utf-8")
    print(output)

if __name__ == "__main__":
    main()
