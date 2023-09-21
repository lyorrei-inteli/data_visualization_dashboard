import { Card } from '@/components/Card'
import {UploadForm} from '@/components/UploadForm'
import { PageHeader } from '@/components/PageHeader'
import React from 'react'

 const Dashboard = () => {
  return (
    <>
        <PageHeader title='Upload de dados de um acidente' subtitle='Faça upload de um arquivo .csv com os dados de um acidente para predizer sua gravidade'/>
        <Card className='h-full flex justify-center items-center'>
          <UploadForm />
        </Card>
    </>
  )
}

export default Dashboard