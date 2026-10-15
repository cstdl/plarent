package com.plarent.backend

import org.springframework.aot.hint.RuntimeHints
import org.springframework.aot.hint.RuntimeHintsRegistrar
import java.util.UUID

// GraalVM native image hints that Spring's AOT processing can't infer.
// Hibernate allocates UUID[] reflectively for UUID primary keys; without this
// the native binary fails at startup building the SessionFactory.
class NativeHints : RuntimeHintsRegistrar {
    override fun registerHints(hints: RuntimeHints, classLoader: ClassLoader?) {
        hints.reflection().registerType(Array<UUID>::class.java)
    }
}
