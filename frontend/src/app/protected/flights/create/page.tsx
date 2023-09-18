import { Card } from '@/components/Card'
import {UploadForm} from '@/components/UploadForm'
import { PageHeader } from '@/components/PageHeader'
import React from 'react'

 const Dashboard = () => {
  return (
    <>
        <PageHeader title='Upload de dados de um voo' subtitle='Faça upload de um arquivo .parquet com os dados de um voo para prevenir falhas no sistema de Bleed do avião'/>
        <Card className='h-full flex justify-center items-center'>
          <UploadForm />
        </Card>
    </>
  )
}

export default Dashboard