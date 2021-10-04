import std/unittest
import ./downpodia

suite "downpodia":
  test "Can say":
    const msg = "Hello from downpodia test"
    check msg == say msg
