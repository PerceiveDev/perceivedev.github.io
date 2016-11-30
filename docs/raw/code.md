# Code Guidelines
These are the guidelines that the code/projects of Perceive memebers **must** follow.

## General guidelines
- Use the [Perceive formatter profile](https://github.com/PerceiveDev/PerceiveResources/blob/master/templates/PerceiveDev-FormatterProfile.xml)
- Always use the [team's .gitignore](https://github.com/PerceiveDev/PerceiveResources/blob/master/templates/gitignore)
- Always use braces with `if`/`else`, `for` loops, `while` loops, etc.
- No random code blocks. If you want to limit the scope of some code, just put it in a method.
- Use Java naming conventions, `camelCase` for variable and method names and `PascalCase` for class names
- Use Maven for projects (see next requirement)
- Always use the [project template](https://www.github.com/PerceiveDev/PerceivePluginArchetype) for plugins
- Put projects in the com.perceivdev.<project> package (already done by the project template)
- Document all methods at a minimum. Documentation of classes, constructors, etc. is appreciated but not required.
- No nonsensical variable names. `Player pfr` or `Player xyz` is no good, but `Player player` or `Player p` are acceptable.
- If possible invert if statements to keep indentation clean
- Avoid nested `if` statements where possible by [inverting the logic](./viewer.html?f=invert-if)
- Avoid massive statements. If it requires 5 lines after wrapping then it's too long, use some intermediate variables.

## Specific guidelines
- Do not blind-cast CommandSender
- No unneeded checks of command label
- Keep the command handlers separate for multiple commands
- No logging to console when the plugin is enabled or disabled saying that it's enabled/disabled. Bukkit already does this for you.
- `plugin.yml` should always list all authors that worked on a project, even if they only did a small part
