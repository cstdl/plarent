package com.plarent.backend.plant

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.time.LocalDate
import java.util.Optional

class PlantServiceTest {

    private val plantRepository: PlantRepository = mock()
    private val plantService = PlantService(plantRepository)

    @Test
    fun `update only changes the fields that are sent`() {
        val plant = Plant(
            name = "Monstera",
            species = "Monstera deliciosa",
            location = "Kitchen",
            acquiredDate = LocalDate.of(2025, 3, 1),
            notes = "Likes indirect light",
        )
        whenever(plantRepository.findById(plant.id)).thenReturn(Optional.of(plant))
        whenever(plantRepository.save(any<Plant>())).thenAnswer { it.arguments[0] }

        val updated = plantService.updatePlant(plant.id, UpdatePlantRequest(name = " Monty ", location = ""))

        assertEquals("Monty", updated.name)
        assertEquals("Monstera deliciosa", updated.species)
        assertNull(updated.location)
        assertEquals(LocalDate.of(2025, 3, 1), updated.acquiredDate)
        assertEquals("Likes indirect light", updated.notes)
    }
}
