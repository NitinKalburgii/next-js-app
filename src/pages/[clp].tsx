import Image from 'next/image';

export default function clp({ final }: { final: any }) {
  return (
    <div className='wrapper'>
      <div className='container'>
        {final?.map((a: any, i: any) => (
          <div key={i} className='card'>
            <Image
              src={a?.img}
              alt={a?.title}
              width={200}
              height={300}
              priority
            />
            <h4>{a?.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const pageUrl = context.req.url;
  if (!pageUrl.includes('-c1-')) {
    return {
      notFound: true,
    };
  }
  const searchTerm = pageUrl.split('-c1-')[1];
  const res = await fetch(
    `https://ac.cnstrc.com/browse/group_id/${searchTerm}?key=key_sGfK8VsLymZ8J4I7&num_results_per_page=6`
  );
  const data = await res.json();
  const searchResult = data?.response?.results;
  let final: any = [];
  const returnResult = searchResult.forEach((a: any) => {
    final.push({
      title: a.value,
      img:
        a.data.image_url != null
          ? a.data.image_url
          : 'https://media.wiley.com/product_data/coverImage300/61/04704328/0470432861.jpg',
    });
  });
  return {
    props: { final },
  };
}
