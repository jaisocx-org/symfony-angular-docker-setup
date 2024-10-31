<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\SampleData;
use Faker\Factory;


class SampleDataFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        // Generate 10 data records
        for ($i = 0; $i < 10; $i++) {
            $data = new SampleData();
            $data->setText($faker->url);

            $manager->persist($data);
        }

        // Save all generated data records to the database
        $manager->flush();
    }
}

