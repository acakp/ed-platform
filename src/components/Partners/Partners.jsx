import './Partners.css';

// временные данные, потом заменишь на реальных партнёров
const PARTNERS = [
  {
    name: 'ICL',
    img: 'icl.jpg',
    site: 'https://icl.ru/',
    text: 'ICL — высокотехнологичная, динамично развивающаяся группа компаний, входящая в число крупнейших ИТ-компаний России, предоставляющая весь спектр ИТ-услуг, проектов, решений и продуктов. Компания была основана в 1991 году на базе завода ЭВМ Казанским производственным ',
  },
  {
    name: 'Татнефть',
    img: 'tatneft.jpg',
    site: 'https://tatneft.ru',
    text: '«Татнефть» - одна из крупнейших российских вертикально-интегрированных компаний, в составе которой динамично развиваются нефтегазодобыча, нефтепереработка, нефтегазохимия, сеть АЗС, композитный кластер, электроэнергетика, разработка и производство оборудования для нефтегазовой отрасли и блок сервисных структур.',
  },
];

function Partners() {
  return (
    <section className="block partners">
      {PARTNERS.map((partner) => (
        <article className="partner" key={partner.name}>
          <a
            className="partner-logo"
            href={partner.site}
            target="_blank"
            rel="noreferrer"
          >
            <img src={partner.img} />
          </a>
          <p className="partner-text">{partner.text}</p>
        </article>
      ))}
    </section>
  );
}

export default Partners;
