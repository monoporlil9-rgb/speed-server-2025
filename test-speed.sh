#!/bin/bash
echo "⚡ SPEED TEST - monoporlil9-rgb"
echo "Testing optimized server..."
echo "=========================="

# Test 10MB
echo -n "10MB Test: "
time=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:7777/download/10)
speed=$(echo "scale=2; 10 / $time" | bc)
echo "$speed MB/s"

# Test 100MB
echo -n "100MB Test: "
time=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:7777/download/100)
speed=$(echo "scale=2; 100 / $time" | bc)
echo "$speed MB/s"
