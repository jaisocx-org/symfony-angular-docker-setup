<?php

namespace App\Controller;

use App\Entity\SampleData;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SampleJsonController extends AbstractController
{
    #[Route('/json/exampleData1/', name: 'app_sample_json')]
    public function index(): JsonResponse
    {
        $data = [
            'message' => 'Congratulations! Symfony API is running.',
        ];
        
        $response = new JsonResponse($data);
        return $response;
    }

    #[Route('/json/exampleData2/', name: 'app_sample_data_table')]
    public function sampleData(
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $dataRecords = $entityManager->getRepository(SampleData::class)->findAll();
        $data = [];
        foreach( $dataRecords as $record) {
            $data[] = [
                'id' => $record->getId(),
                'text' => $record->getText(),
            ];
        }
        
        $response = new JsonResponse($data);
        return $response;
    }
}
