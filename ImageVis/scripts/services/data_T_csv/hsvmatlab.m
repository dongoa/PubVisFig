% a  = imread('1.jpg');
% hsv=rgb2hsv(a);
% h=hsv(:,:,1);
% figure,
% subplot(2,2,1),imshow(hsv);title('hsv��ʽͼ');
% subplot(2,2,2),imshow(h);title('h');
fileFolder=fullfile('C:\Users\dong\Desktop\Keydata\class_data\imagesData(T1-T16)(07-16)\2016\');%�ļ�����plane
dirOutput=dir(fullfile(fileFolder,'*'));%������ڲ�ͬ���͵��ļ����á�*����ȡ���У������ȡ�ض������ļ���'.'�����ļ����ͣ������á�.jpg��
fileNames={dirOutput.name}';

TLfile = length(fileNames)

for Tnums=3:TLfile
    filename=['2016',fileNames{Tnums},'.csv'];
    fileFolder3 = fullfile(['C:\Users\dong\Desktop\Keydata\class_data\imagesData(T1-T16)(07-16)\2016\',fileNames{Tnums}]);
    DIR2=dir(fullfile(fileFolder3,'*'));
    fileNames4={DIR2.name}';
    fileNames4
    Lfile = size(fileNames4);
    fid=fopen(filename,'w');
    count=0;
    fprintf(fid,"%s,%s,%s,%s\n",'paperID','imageID','size','uncertainty');
    fprintf(fid,"%s,%s,%d,%d\n",'',['2016',fileNames{Tnums}],'',Lfile(1)-2);
    for index=3:Lfile
    fileFolder2 = fullfile(['C:\Users\dong\Desktop\Keydata\class_data\imagesData(T1-T16)(07-16)\2016\',fileNames{Tnums},'\',fileNames4{index}]);
    DIR = dir(fullfile(fileFolder2,'*'));
    fileNames2={DIR.name};
    fileNames2
    Lf2 = length(fileNames2)
    fprintf(fid,"%s,%s,%d,%d\n",['2016',fileNames{Tnums}],fileNames4{index},'',Lf2-2);
    for j=3:Lf2
        cell_str = strsplit( fileNames2{j},'%');
        cell_str{1,1}
        I = imread(['C:\Users\dong\Desktop\Keydata\class_data\imagesData(T1-T16)(07-16)\2016\',fileNames{Tnums},'\',fileNames4{index},'\',fileNames2{j}]);
        [M,N]=size(I);
%         S = ImgEntropy(I);
        fprintf(fid,"%s,%s,%d,%d\n",fileNames4{index},fileNames2{j},M*N,1);
    end
    
end
end
% filename='bubbledata.csv';





function [res] = ImgEntropy(I)
%��ͼ����ֵ
%����һ�Ų�ɫͼƬ�ľ���
%���ͼƬ��ͼ����ֵ

I_gray = rgb2gray(I);
[ROW,COL] = size(I_gray);


%%
%�½�һ��size =256�ľ�������ͳ��256���Ҷ�ֵ�ĳ��ִ���
temp = zeros(256);
for i= 1:ROW

for j = 1:COL
%ͳ�Ƶ�ǰ�Ҷȳ��ֵĴ���
temp(I_gray(i,j)+1)= temp(I_gray(i,j)+1)+1;

end
end

%%

res = 0.0 ; 
for  i = 1:256
%���㵱ǰ�Ҷ�ֵ���ֵĸ���
temp(i) = temp(i)/(ROW*COL);

%�����ǰ�Ҷ�ֵ���ֵĴ�����Ϊ0
if temp(i)~=0.0

res = res - temp(i) * (log(temp(i)) / log(2.0));
end
end
disp(res);
end
