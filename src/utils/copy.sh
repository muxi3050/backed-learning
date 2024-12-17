#!/bin/sh
cd /Users/muxi/代码/ts/mk320/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log