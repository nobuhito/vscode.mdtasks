![version](https://vsmarketplacebadge.apphb.com/version-short/nobuhito.mdtasks.svg)
![installs](https://vsmarketplacebadge.apphb.com/installs-short/nobuhito.mdtasks.svg)
![rating](https://vsmarketplacebadge.apphb.com/rating-short/nobuhito.mdtasks.svg)
![trendDaily](https://vsmarketplacebadge.apphb.com/trending-daily/nobuhito.mdtasks.svg)
![trendWeekly](https://vsmarketplacebadge.apphb.com/trending-weekly/nobuhito.mdtasks.svg)
![trandMonthly](https://vsmarketplacebadge.apphb.com/trending-monthly/nobuhito.mdtasks.svg)

# MDTasks - Extension for VS Code

Task management in Markdown format.

[日本語によるBlog記事はこちら](https://blog.bulkus.net/post/mdtasks_for_vscode/)

## Features

- Display future task list to QuickPick
- Highlight the scheduled date
- Toggle task completion and incomplete with just the enter key (with actionlock)
- Easily specify the scheduled date (with actionlock)

![gif](https://github.com/nobuhito/vscode.mdtasks/blob/master/gif/mdtasks.gif?raw=true)

## Commands

- showListShow tasks list :  Show task list sorted by date.
- Insert date (`Ctrl+, d`) :  Insert today's date.
- toggleTask : Toggle Done / Undone of the task.
- Execute ActionLock (`Enter` on underscored word) : see [ActionLock](https://marketplace.visualstudio.com/items?itemName=nobuhito.actionlock).

## Requirements

[ActionLock](https://marketplace.visualstudio.com/items?itemName=nobuhito.actionlock)

## Configuration Options

Highlight color

Key             | Description                  | Default | 和名(Japanese color name)
----------------|------------------------------|---------|------------
colorOfToday    | BGColor of today's tasks     | #f8e58c | [淡黄][]
colorOfTomorrow | BGColor of tomorrow tasks    | #bbc8e6 | [淡藤色][]
colorOfPastday  | BGColor of pastday's tasks   | #f0908d | [薄紅][]
colorOfThisWeek | BGColor of this week's tasks | #badcad | [薄萌葱][]

[淡黄]: https://www.colordic.org/colorsample/2164.html
[淡藤色]: https://www.colordic.org/colorsample/2353.html
[薄紅]: https://www.colordic.org/colorsample/2279.html
[薄萌葱]: https://www.colordic.org/colorsample/2422.html

## Release Notes

See [Changelog](https://github.com/nobuhito/vscode.mdtasks/blob/master/CHANGELOG.md).